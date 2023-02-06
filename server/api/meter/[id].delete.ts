import Meter from "../../models/meter";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  try {
    const meter = await Meter.findByPk(id);

    if (!meter) {
      throw createError({
        message: "No meter found with the given id",
        statusCode: 404,
        fatal: false,
      });
    }
    await meter.destroy();
    return { message: "Meter has been deleted" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});