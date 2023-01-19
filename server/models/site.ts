import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    coordinates: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    },
    address: {
      type: String,
      required: true,
    },
    post_code: {
      type: String,
      required: true,
    },
  },
);

export default mongoose.model("Site", schema, "site");