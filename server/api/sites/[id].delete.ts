import Site from "../../models/sites";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  try {
    const site = await Site.findByPk(id);

    if (!site) {
      throw createError({
        message: "No site found with the given id",
        statusCode: 404,
        fatal: false,
      });
    }
    await site.destroy();
    return { message: "Site has been deleted" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});