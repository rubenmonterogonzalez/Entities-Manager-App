import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    customerId: {
      type: Number
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    vat_number: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", schema, "customer");