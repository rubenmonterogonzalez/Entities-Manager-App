import SiteModel from "../../models/site";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  try {
    await SiteModel.findByIdAndDelete(id);
    return { message: "Site has been deleted" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});