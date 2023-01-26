import MeterModel from "../../models/meter";
import { MeterSchema } from "../../validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  let { error } = MeterSchema.validate(body);
  if (error) {
    throw createError({
      message: error.message.replace(/"/g, ""),
      statusCode: 400,
      fatal: false,
    });
  }

  try {
    await MeterModel.create(body);
    return { message: "Meter has been created" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }

});
