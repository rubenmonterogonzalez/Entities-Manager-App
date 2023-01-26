import SiteModel from "../../models/site";

export default defineEventHandler(async (event) => {
  return await SiteModel.find(); 
});