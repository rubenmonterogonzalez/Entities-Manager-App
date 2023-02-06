import Circuit from "../../models/circuit";

export default defineEventHandler(async (event) => {
  const circuits = await Circuit.findAll();
  return circuits;
});