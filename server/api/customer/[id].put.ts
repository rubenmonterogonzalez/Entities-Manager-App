import Customer from "../../models/customer";
import { CustomerSchema } from "../../validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const id = event.context.params.id;

  let { error } = CustomerSchema.validate(body, {
    abortEarly: true,
    allowUnknown: true,
  });
  if (error) {
    throw createError({
      message: error.message.replace(/"/g, ""),
      statusCode: 400,
      fatal: false,
    });
  }

  try {
    await Customer.update(id, body);
    return { message: "Customer has been updated" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});

// const updateCustomer = async (id, data) => {
//   try {
//     const updatedCustomer = await Customer.update(data, {
//       where: { id: id },
//       returning: true,
//       plain: true,
//     });
//     return updatedCustomer;
//   } catch (err) {
//     throw err;
//   }
// };