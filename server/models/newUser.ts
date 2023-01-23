import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
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
    serial_number: {
      type: Number,
      required: true,
      unique: true,
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
  { timestamps: true }
);

export default mongoose.model("NewUser", schema, "newUser");