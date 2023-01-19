import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    serial_number: {
      type: Number,
      required: true,
      unique: true,
    },
    installation_date: {
      type: Date,
      required: true
    },
  },
);

export default mongoose.model("Meter", schema, "meter");