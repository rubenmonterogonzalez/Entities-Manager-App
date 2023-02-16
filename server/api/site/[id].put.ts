import Site from "../../models/site";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const id = event.context.params.id;

  try {
    const site = await Site.findByPk(id);

    if(!site) {
      throw createError({
        message: "No site found with the given id",
        statusCode: 404,
        fatal: false,
      });
    }
    await site.update(body);
    return { message: "Site has been updated" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});