import "./bootstrap.min.css";
import "./App.css";
import UploadForm from "./components/UploadForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import Chart from "react-apexcharts";
import DisplayTable from "./components/DisplayTable";
import { Spinner } from "react-bootstrap";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [isChart, setIsChart] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return toast("Select File");
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:5000/upload", formData)
      .then((response) => {
        toast(response.data.message);
        fetchData();
      })
      .catch((error) => toast.error(error.message));
  };

  const fetchData = () => {
    axios
      .get("http://localhost:5000/data")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => toast.error(error));
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if (!filters) return toast("Select Filters");
    if (data.length === 0) return toast("Data not available");
    axios
      .post("http://localhost:5000/filter", filters)
      .then((response) => {
        setData(response.data);
        setIsChart(false);
      })
      .catch((error) => toast.error(error.message));
  };

  const handleChartClick = () => {
    if (data.length === 0) return toast("Data not available");
    const chartData = data.reduce((acc, curr) => {
      const month = curr.Date.slice(0, 3);
      if (acc[month]) {
        acc[month].Units_Sold += curr.Units_Sold;
        acc[month].Sales += curr.Sales;
        acc[month].Profit += curr.Profit;
      } else {
        acc[month] = {
          Units_Sold: curr.Units_Sold,
          Sales: curr.Sales,
          Profit: curr.Profit,
        };
      }
      return acc;
    }, {});

    setOptions({
      title: {
        text: "Monthly Sales and Profit",
      },
      xaxis: {
        categories: Object.keys(chartData),
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
    });

    setSeries([
      {
        name: "Units Sold",
        data: Object.values(chartData).map((obj) => obj.Units_Sold),
      },
      {
        name: "Sales",
        data: Object.values(chartData).map((obj) => obj.Sales),
      },
      {
        name: "Profit",
        data: Object.values(chartData).map((obj) => obj.Profit),
      },
    ]);
    setIsChart(true);
  };

  return (
    <div className="App">
      <h1 className="mt-2">Data Charts</h1>
      <hr />

      <UploadForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleFilterChange={handleFilterChange}
        handleFilterSubmit={handleFilterSubmit}
        handleChartClick={handleChartClick}
        isChart={isChart}
        setIsChart={setIsChart}
      />

      {loading ? (
        <Spinner animation="border" variant="dark" />
      ) : isChart ? (
        <Chart
          options={options}
          series={series}
          type="bar"
          height="420"
          width="100%"
        />
      ) : (
        <DisplayTable data={data} />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
