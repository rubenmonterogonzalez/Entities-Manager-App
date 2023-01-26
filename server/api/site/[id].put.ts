import SiteModel from "../../models/site";
import { SiteSchema } from "../../validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const id = event.context.params.id;

  let { error } = SiteSchema.validate(body, {
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
    await SiteModel.findByIdAndUpdate(id, body);
    return { message: "Site has been updated" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});