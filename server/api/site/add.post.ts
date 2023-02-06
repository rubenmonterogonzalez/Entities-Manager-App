import Site from "../../models/site";
import Customer from "../../models/customer";
// import { SiteSchema } from "../../validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // let { error } = SiteSchema.validate(body);
  // if (error) {
  //   throw createError({
  //     message: error.message.replace(/"/g, ""),
  //     statusCode: 400,
  //     fatal: false,
  //   });
  // }

  try {
    await Site.create(body);
    return { message: "Site has been created" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});
