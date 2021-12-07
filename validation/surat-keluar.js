const Joi = require("joi");

module.exports = {
  // create validation
  create: Joi.object({
    nomer_surat: Joi.string().required().messages({
      "string.base": "nomor surat harus berisi huruf",
      "string.empty": "nomor surat harus tidak boleh kosong",
      "any.required": "nomor surat harus harus diisi",
    }),
    perihal: Joi.string().required().messages({
      "string.base": "perihal surat harus berisi huruf",
      "string.empty": "perihal surat harus tidak boleh kosong",
      "any.required": "perihal surat harus harus diisi",
    }),
    isi: Joi.string().required().messages({
      "string.base": "isi surat harus berisi huruf",
      "string.empty": "isi surat harus tidak boleh kosong",
      "any.required": "isi surat harus harus diisi",
    }),
    tanggal_surat: Joi.string().required().messages({
      "string.base": "tanggal surat harus berisi huruf",
      "string.empty": "tanggal surat harus tidak boleh kosong",
      "any.required": "tanggal surat harus harus diisi",
    }),
    id_jenis: Joi.required().messages({
      "any.required": "jenis surat harus harus diisi",
    }),
    isPublic: Joi.required().messages({
      "any.required": "status surat harus harus diisi",
    }),
    tujuan: Joi.required().messages({
      "any.required": "tujuan surat harus harus diisi",
    }),
    pengesahan: Joi.required().messages({
      "any.required": "pengesahan surat harus harus diisi",
    }),
  }),

  // update validation
  edit: Joi.object({
    nomer_surat: Joi.string().messages({
      "string.base": "nomor surat harus berisi huruf",
      "string.empty": "nomor surat harus tidak boleh kosong",
    }),
    perihal: Joi.string().messages({
      "string.base": "perihal surat harus berisi huruf",
      "string.empty": "perihal surat harus tidak boleh kosong",
    }),
    isi: Joi.string().messages({
      "string.base": "isi surat harus berisi huruf",
      "string.empty": "isi surat harus tidak boleh kosong",
    }),
    tanggal_surat: Joi.string().messages({
      "string.base": "isi surat harus berisi huruf",
      "string.empty": "isi surat harus tidak boleh kosong",
    }),
    id_jenis: Joi.required().messages({
      "any.required": "jenis surat harus harus diisi",
    }),
    isPublic: Joi.required().messages({
      "any.required": "status surat harus harus diisi",
    }),
  }),
};
