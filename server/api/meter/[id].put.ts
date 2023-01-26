import MeterModel from "../../models/meter";
import { MeterSchema } from "../../validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const id = event.context.params.id;

  let { error } = MeterSchema.validate(body, {
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
    await MeterModel.findByIdAndUpdate(id, body);
    return { message: "Meter has been updated" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});