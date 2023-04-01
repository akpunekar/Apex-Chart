import React from "react";
import { Form, Button, Row } from "react-bootstrap";

const UploadForm = ({
  handleChange,
  handleSubmit,
  handleFilterChange,
  handleFilterSubmit,
  handleChartClick,
  isChart,
  setIsChart,
}) => {
  return (
    <Row>
      <Form className="col-md-5" onSubmit={handleSubmit}>
        <h3>Upload File</h3>
        <Form.Group className="mb-3">
          <Form.Control onChange={handleChange} type="file" />
        </Form.Group>
        <div className="mb-2 text-center">
          <Button type="submit" variant="primary">
            Upload
          </Button>
        </div>
      </Form>
      <Form className="col-md-7 row">
        <h3>Filter</h3>
        <Form.Group className="col-md-6 mb-3">
          <Form.Control
            placeholder="Country"
            type="text"
            name="Country"
            id="country"
            onChange={handleFilterChange}
          />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3">
          <Form.Control
            placeholder="Product"
            type="text"
            name="Product"
            id="product"
            onChange={handleFilterChange}
          />
        </Form.Group>
        <Form.Group className="col-md-6 mb-3">
          <Form.Control
            placeholder="Month"
            type="text"
            name="Month_Name"
            id="month"
            onChange={handleFilterChange}
          />
        </Form.Group>
        <div className="col-md-6 d-flex pb-3 justify-content-evenly">
          <Button onClick={handleFilterSubmit} variant="primary">
            Filter
          </Button>
          {!isChart && (
            <Button variant="primary" onClick={handleChartClick}>
              Show Chart
            </Button>
          )}
          {isChart && (
            <Button variant="primary" onClick={() => setIsChart(false)}>
              Show Table
            </Button>
          )}
        </div>
      </Form>
    </Row>
  );
};

export default UploadForm;
