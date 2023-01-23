import CustomerModel from "../../models/newUser";
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
    await CustomerModel.findByIdAndUpdate(id, body);
    return { message: "Customer has been updated" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});