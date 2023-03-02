import Meter from "../../models/meters";

export default defineEventHandler(async (event) => {
  const meters = await Meter.findAll();
  return meters;
});