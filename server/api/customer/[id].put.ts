import Customer from "../../models/customer";
// import { CustomerSchema } from "../../validation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const id = event.context.params.id;

  // let { error } = CustomerSchema.validate(body, {
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
    const customer = await Customer.findByPk(id);

    if (!customer) {
      throw createError({
        message: "No customer found with the given id",
        statusCode: 404,
        fatal: false,
      });
    }

    await customer.update(body);

    return { message: "Customer has been updated" };
  } catch (err: any) {
    throw createError({
      message: err.message,
    });
  }
});
//  try {
//     const [affectedRows] = await Customer.update(body, {
//       where: {
//         id: id
//       }
//     });

//     if (affectedRows > 0) {
//       return { message: "Customer has been updated" };
//     } else {
//       throw createError({
//         message: "No customer found with the given id",
//         statusCode: 404,
//         fatal: false,
//       });
//     }
//   } catch (err) {
//     throw createError({
//       message: err.message,
//     });
//   }

