import CustomerModel from "../../models/customer";

export default defineEventHandler(async (event) => {
  return await CustomerModel.find().populate("customers");
});
