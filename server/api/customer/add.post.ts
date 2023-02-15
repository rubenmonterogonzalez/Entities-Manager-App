import Customer from "../../models/customer";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const customer = await Customer.create(body);
    return { message: "Customer has been created", data: customer };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});
