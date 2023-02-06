import Circuit from "../../models/circuit";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  try {
    const circuit = await Circuit.findByPk(id);

    if (!circuit) {
      throw createError({
        message: "No circuit found with the given id",
        statusCode: 404,
        fatal: false,
      });
    }
    await circuit.destroy();
    return { message: "Circuit has been deleted" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});