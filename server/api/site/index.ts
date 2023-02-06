import Site from "../../models/site";

export default defineEventHandler(async (event) => {
  const sites = await Site.findAll();
  return sites; 
});