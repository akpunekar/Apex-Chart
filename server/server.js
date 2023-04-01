require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const excelToJson = require("convert-excel-to-json");
const Data = require("./Data");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage }).single("file");

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Error uploading file" });
    }
    const result = excelToJson({
      sourceFile: `./uploads/${req.file.filename}`,
      header: { rows: 1 },
      columnToKey: {
        A: "Segment",
        B: "Country",
        C: "Product",
        D: "Discount_Band",
        E: "Units_Sold",
        F: "Manufacturing_Price",
        G: "Sale_Price",
        H: "Gross_Sales",
        I: "Discounts",
        J: "Sales",
        K: "COGS",
        L: "Profit",
        M: "Date",
      },
    });
    const data = result.Sheet1.map(
      (row) =>
        new Data({
          Segment: row.Segment,
          Country: row.Country,
          Product: row.Product,
          Discount_Band: row.Discount_Band,
          Units_Sold: row.Units_Sold,
          Manufacturing_Price: row.Manufacturing_Price,
          Sale_Price: row.Sale_Price,
          Gross_Sales: row.Gross_Sales,
          Discounts: row.Discounts,
          Sales: row.Sales,
          COGS: row.COGS,
          Profit: row.Profit,
          Date: row.Date,
        })
    );
    Data.insertMany(data)
      .then(() => res.json({ message: "File uploaded, Please Wait !!" }))
      .catch((error) => res.status(400).json({ message: error.message }));
  });
});

app.get("/data", (req, res) => {
  Data.find()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

app.post("/filter", (req, res) => {
  const filter = {};
  if (req.body.Country) {
    filter.Country = req.body.Country;
  }
  if (req.body.Product) {
    filter.Product = req.body.Product;
  }
  if (req.body.Month_Name) {
    filter.Date = { $regex: req.body.Month_Name, $options: "i" };
  }
  Data.find(filter)
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
