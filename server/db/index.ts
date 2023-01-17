import mongoose from "mongoose";
import { Nitro } from 'nitropack'

const config = useRuntimeConfig();

export default async (_nitroApp: Nitro) => {
  try {
    await mongoose.set("strictQuery", true).connect(config.MONGO_URL);
    console.log("DB connection established.");
  } catch (err) {
    console.log("DB connection failed.", err);
  }
};