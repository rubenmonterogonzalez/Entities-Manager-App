import Customer from "../../models/customer";
// import { CustomerSchema } from "../../validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // let { error } = CustomerSchema.validate(body);
  // if (error) {
  //   throw createError({
  //     message: error.message.replace(/"/g, ""),
  //     statusCode: 400,
  //     fatal: false,
  //   });
  // }

  try {
    await Customer.create(body);
    return { message: "Customer has been created" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});
