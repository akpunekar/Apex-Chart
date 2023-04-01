const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    Segment: { type: String, required: true },
    Country: { type: String, required: true },
    Product: { type: String, required: true },
    Discount_Band: { type: String, required: true },
    Units_Sold: { type: Number, required: true },
    Manufacturing_Price: { type: Number, required: true },
    Sale_Price: { type: Number, required: true },
    Gross_Sales: { type: Number, required: true },
    Discounts: { type: Number, required: true },
    Sales: { type: Number, required: true },
    COGS: { type: Number, required: true },
    Profit: { type: Number, required: true },
    Date: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
