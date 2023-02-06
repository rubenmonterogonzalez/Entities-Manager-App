import Circuit from "../../models/circuit";
// import { CircuitSchema } from "../../validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // let { error } = CircuitSchema.validate(body);
  // if (error) {
  //   throw createError({
  //     message: error.message.replace(/"/g, ""),
  //     statusCode: 400,
  //     fatal: false,
  //   });
  // }

  try {
    await Circuit.create(body);
    return { message: "Circuit has been created" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }

});
