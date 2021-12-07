const Joi = require("joi");

module.exports = {
  // create validation
  create: Joi.object({
    nama: Joi.string().required().messages({
      "string.base": "nama harus berisi huruf",
      "string.empty": "nama harus tidak boleh kosong",
      "any.required": "nama harus harus diisi",
    }),
  }),

  // update validation
  edit: Joi.object({
    nama: Joi.string().messages({
      "string.base": "nama harus berisi huruf",
      "string.empty": "nama harus tidak boleh kosong",
    }),
  }),
};
