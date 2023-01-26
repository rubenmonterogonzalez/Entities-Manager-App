import MeterModel from "../../models/meter";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  try {
    await MeterModel.findByIdAndDelete(id);
    return { message: "Meter has been deleted" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});