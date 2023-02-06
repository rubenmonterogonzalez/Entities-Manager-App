import Meter from "../../models/meter";

export default defineEventHandler(async (event) => {
  const meters = await Meter.findAll();
  return meters;
});