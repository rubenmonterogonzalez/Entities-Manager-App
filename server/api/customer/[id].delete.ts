import Customer from "../../models/customer";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  try {
    await Customer.destroy(id);
    return { message: "Customer has been deleted" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});