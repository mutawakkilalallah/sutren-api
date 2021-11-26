const Joi = require("joi");

module.exports = {
  // create validation
  create: Joi.object({
    id_surat: Joi.string().required().messages({
      "string.base": "id surat harus berisi huruf",
      "string.empty": "id surat harus tidak boleh kosong",
      "any.required": "id surat harus harus diisi",
    }),
    kategori: Joi.string().required().messages({
      "string.base": "kategori harus berisi huruf",
      "string.empty": "kategori harus tidak boleh kosong",
      "any.required": "kategori harus harus diisi",
    }),
  }),

  // edit validation
  edit: Joi.object({
    id_surat: Joi.string().messages({
      "string.base": "id surat harus berisi huruf",
      "string.empty": "id surat harus tidak boleh kosong",
    }),
    kategori: Joi.string().messages({
      "string.base": "kategori harus berisi huruf",
      "string.empty": "kategori harus tidak boleh kosong",
    }),
  }),
};
