import CustomerModel from "../../models/newUser";

export default defineEventHandler(async (event) => {
  return await CustomerModel.find();
});


