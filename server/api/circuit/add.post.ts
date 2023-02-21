import Circuit from "../../models/circuit";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const circuit = await Circuit.create(body);
    return { message: "Circuit has been created", data: circuit };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }

});
