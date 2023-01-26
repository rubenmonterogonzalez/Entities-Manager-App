import MeterModel from "../../models/meter";

export default defineEventHandler(async (event) => {
  return await MeterModel.find();
});