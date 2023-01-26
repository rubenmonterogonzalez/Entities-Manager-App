import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    circuitId: {
      type: Number
    },
    installation_date: {
      type: Date,
      required: true
    },
    is_main: {
      type: Boolean,
      required: true,
    }
  },
);

export default mongoose.model("Circuit", schema, "circuit");