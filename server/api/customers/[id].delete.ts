import CustomerModel from "../../models/newUser";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  try {
    await CustomerModel.findByIdAndDelete(id);
    return { message: "Customer has been deleted" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});