import Circuit from "../../models/circuits";

export default defineEventHandler(async (event) => {
  const circuits = await Circuit.findAll();
  return circuits;
});