import Site from "../../models/site";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const data = await Site.create(body);
    return { data, message: "Site has been created" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});
