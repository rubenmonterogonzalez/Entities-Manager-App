import Customer from "../../models/customers";

export default defineEventHandler(async (event) => {
  const customers = await Customer.findAll(); 
  return customers;
});


