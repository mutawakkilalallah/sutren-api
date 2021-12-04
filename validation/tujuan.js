const Joi = require("joi");

module.exports = {
  // create validation
  create: Joi.object({
    nama: Joi.string().required().messages({
      "string.base": "nama harus berisi huruf",
      "string.empty": "nama harus tidak boleh kosong",
      "any.required": "nama harus harus diisi",
    }),
    kategori: Joi.string().required().messages({
      "string.base": "kategori harus berisi huruf",
      "string.empty": "kategori harus tidak boleh kosong",
      "any.required": "kategori harus harus diisi",
    }),
  }),

  // update validation
  edit: Joi.object({
    nama: Joi.string().messages({
      "string.base": "nama harus berisi huruf",
      "string.empty": "nama harus tidak boleh kosong",
    }),
    kategori: Joi.string().messages({
      "string.base": "kategori harus berisi huruf",
      "string.empty": "kategori harus tidak boleh kosong",
    }),
  }),
};
