import Site from "../../../models/sites";

export default defineEventHandler(async (event) => {
  const sites = await Site.findAll();
  return sites; 
});