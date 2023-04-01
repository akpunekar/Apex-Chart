import React from "react";
import { Table } from "react-bootstrap";

const DisplayTable = ({ data }) => {
  return (
    <div>
      <Table striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>Segment</th>
            <th>Country</th>
            <th>Product</th>
            <th>Units Sold</th>
            <th>Sale Price</th>
            <th>Gross Sales</th>
            <th>Sales</th>
            <th>COGS</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.Segment}</td>
              <td>{item.Country}</td>
              <td>{item.Product}</td>
              <td>{item.Units_Sold}</td>
              <td>{item.Sale_Price}</td>
              <td>{item.Gross_Sales}</td>
              <td>{item.Sales}</td>
              <td>{item.COGS}</td>
              <td>{item.Profit}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayTable;
