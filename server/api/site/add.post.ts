import SiteModel from "../../models/site";
import { SiteSchema } from "../../validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  let { error } = SiteSchema.validate(body);
  if (error) {
    throw createError({
      message: error.message.replace(/"/g, ""),
      statusCode: 400,
      fatal: false,
    });
  }

  try {
    await SiteModel.create(body);
    return { message: "Site has been created" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});
