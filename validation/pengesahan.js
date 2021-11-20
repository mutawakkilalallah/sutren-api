const Joi = require("joi");

module.exports = {
  // create validation
  create: Joi.object({
    nama: Joi.string().required().messages({
      "string.base": "nama harus berisi huruf",
      "string.empty": "nama harus tidak boleh kosong",
      "any.required": "nama harus harus diisi",
    }),
    jabatan: Joi.string().required().messages({
      "string.base": "jabatan harus berisi huruf",
      "string.empty": "jabatan harus tidak boleh kosong",
      "any.required": "jabatan harus harus diisi",
    }),
    niup: Joi.number().required().messages({
      "number.base": "niup harus berisi angka",
      "number.empty": "niup harus tidak boleh kosong",
      "any.required": "niup harus harus diisi",
    }),
  }),

  // update validation
  edit: Joi.object({
    nama: Joi.string().required().messages({
      "string.base": "nama harus berisi huruf",
      "string.empty": "nama harus tidak boleh kosong",
    }),
    jabatan: Joi.string().required().messages({
      "string.base": "jabatan harus berisi huruf",
      "string.empty": "jabatan harus tidak boleh kosong",
    }),
    niup: Joi.number().required().messages({
      "number.base": "niup harus berisi angka",
      "number.empty": "niup harus tidak boleh kosong",
    }),
  }),
};
