import Joi from "joi";

export const CustomerSchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().min(10).required(),
  vat_number: Joi.string().min(8).required(),
  // coordinates: Joi.object({
  //   latitude: Joi.number().required(),
  //   longitude: Joi.number().required()
  // }).required(),
  // address: Joi.string().min(12).required(),
  // post_code: Joi.string().min(6).required(),
  // serial_number: Joi.number().required(),
  // installation_date: Joi.date().required(),
  // is_main: Joi.boolean().required(),
});