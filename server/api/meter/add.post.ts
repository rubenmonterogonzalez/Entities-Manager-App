import Meter from "../../models/meter";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const data = await Meter.create(body);
    return { data, message: "Meter has been created" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});
