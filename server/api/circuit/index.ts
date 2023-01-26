import CircuitModel from "../../models/circuit";

export default defineEventHandler(async (event) => {
  return await CircuitModel.find();
});