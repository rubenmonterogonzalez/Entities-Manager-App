import Circuit from "../../models/circuit";
// import { CircuitSchema } from "../../validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const id = event.context.params.id;

  // let { error } = CircuitSchema.validate(body, {
  //   abortEarly: true,
  //   allowUnknown: true,
  // });
  // if (error) {
  //   throw createError({
  //     message: error.message.replace(/"/g, ""),
  //     statusCode: 400,
  //     fatal: false,
  //   });
  // }

  try {
    const circuit = await Circuit.findByPk(id);

    if(!circuit) {
      throw createError({
        message: "No circuit found with the given id",
        statusCode: 404,
        fatal: false,
      });
    }

    await circuit.update(body);
    return { message: "Circuit has been updated" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});