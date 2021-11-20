const Joi = require("joi");

module.exports = {
  // create validation
  create: Joi.object({
    nama: Joi.string().required(),
    jabatan: Joi.string().required(),
    niup: Joi.number().required(),
  }),

  // update validation
  edit: Joi.object({
    nama: Joi.string(),
    jabatan: Joi.string(),
    niup: Joi.number(),
  }),
};
