import Customer from "../../models/customers";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const id = event.context.params.id;

  try {
    const customer = await Customer.findByPk(id);

    if (!customer) {
      throw createError({
        message: "No customer found with the given id",
        statusCode: 404,
        fatal: false,
      });
    }

    await customer.update(body);

    return { message: "Customer has been updated" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});


