import Meter from "../../models/meters";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

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

    await meter.update(body);
    return { message: "Meter has been updated" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});