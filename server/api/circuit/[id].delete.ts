import CircuitModel from "../../models/circuit";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  try {
    await CircuitModel.findByIdAndDelete(id);
    return { message: "Circuit has been deleted" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});