const Joi = require("joi");

module.exports = {
  // create validation
  create: Joi.object({
    nama: Joi.string().required(),
  }),

  // update validation
  edit: Joi.object({
    nama: Joi.string(),
  }),
};
