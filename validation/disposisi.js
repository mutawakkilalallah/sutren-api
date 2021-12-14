const { required } = require("joi");
const Joi = require("joi");

module.exports = {
  // create validation
  create: Joi.object({
    keamanan: Joi.string().required().messages({
      "string.base": "keamanan harus berisi huruf",
      "string.empty": "keamanan tidak boleh kosong",
      "any.required": "keamanan harus diisi",
    }),
    catatan_sekretaris: Joi.string().messages({
      "string.base": "catatan sekretaris harus berisi huruf",
      "string.empty": "catatan sekretaris tidak boleh kosong",
    }),
    catatan_kepala: Joi.string().messages({
      "string.base": "catatan kepala harus berisi huruf",
      "string.empty": "catatan kepala tidak boleh kosong",
    }),
    catatan_pengasuh: Joi.string().messages({
      "string.base": "catatan pengasuh harus berisi huruf",
      "string.empty": "catatan pengasuh tidak boleh kosong",
    }),
    tujuan: Joi.required().messages({
      "any.required": "tujuan disposisi harus diisi",
    }),
  }),

  // edit validation
  edit: Joi.object({
    keamanan: Joi.string().messages({
      "string.base": "kategori harus berisi huruf",
      "string.empty": "kategori tidak boleh kosong",
    }),
    catatan_sekretaris: Joi.string().messages({
      "string.base": "catatan sekretaris harus berisi huruf",
      "string.empty": "catatan sekretaris tidak boleh kosong",
    }),
    catatan_kepala: Joi.string().messages({
      "string.base": "catatan kepala harus berisi huruf",
      "string.empty": "catatan kepala tidak boleh kosong",
    }),
    catatan_pengasuh: Joi.string().messages({
      "string.base": "catatan pengasuh harus berisi huruf",
      "string.empty": "catatan pengasuh tidak boleh kosong",
    }),
  }),
};
