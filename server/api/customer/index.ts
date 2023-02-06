import Customer from "../../models/customer";

export default defineEventHandler(async (event) => {
  const customers = await Customer.findAll(); 
  return customers;
});


