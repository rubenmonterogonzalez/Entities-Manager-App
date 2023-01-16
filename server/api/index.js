// import mongoose from "mongoose";

// const config = useRuntimeConfig();

// export default defineEventHandler(async (event) => {
//   try {
//     await mongoose.connect(config.mongoUrl);
//     console.log("DB connection established.");
//   } catch (err) {
//     console.log("DB connection failed.", err);
//   }
// });

import mongoose from "mongoose";
import { Nitro } from 'nitropack'
const config = useRuntimeConfig();

export default defineEventHandler = async (_nitroApp: Nitro) => {
  mongoose.set("strictQuery", true)
    .connect(config.MONGO_URL)
    .then(() => console.log('connected to db'));
    .catch(err => console.log('error connecting to db', err));
};
