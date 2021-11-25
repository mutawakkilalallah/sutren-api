const Joi = require("joi");

module.exports = {
  // create validation
  create: Joi.object({
    nomer_urut: Joi.number().required().messages({
      "number.base": "nomor urut surat harus berupa angka",
      "number.empty": "nomor urut surat tidak boleh kosong",
      "any.required": "nomor urut surat harus diisi",
    }),
    nomer_agenda: Joi.string().required().messages({
      "string.base": "nomer_agenda surat harus berisi huruf",
      "string.empty": "nomer_agenda surat tidak boleh kosong",
      "any.required": "nomer_agenda surat harus diisi",
    }),
    kode_arsip: Joi.string().required().messages({
      "string.base": "kode_arsip surat harus berisi huruf",
      "string.empty": "kode_arsip surat tidak boleh kosong",
      "any.required": "kode_arsip surat harus diisi",
    }),
    tanggal_terima: Joi.string().required().messages({
      "string.base": "tanggal_terima surat harus berisi huruf",
      "string.empty": "tanggal_terima surat tidak boleh kosong",
      "any.required": "tanggal_terima surat harus diisi",
    }),
    tanggal_surat: Joi.string().required().messages({
      "string.base": "tanggal_surat surat harus berisi huruf",
      "string.empty": "tanggal_surat surat tidak boleh kosong",
      "any.required": "tanggal_surat surat harus diisi",
    }),
    nomer_surat: Joi.string().required().messages({
      "string.base": "nomer_surat surat harus berisi huruf",
      "string.empty": "nomer_surat surat tidak boleh kosong",
      "any.required": "nomer_surat surat harus diisi",
    }),
    asal: Joi.string().required().messages({
      "string.base": "asal surat harus berisi huruf",
      "string.empty": "asal surat tidak boleh kosong",
      "any.required": "asal surat harus diisi",
    }),
    alamat: Joi.string().required().messages({
      "string.base": "alamat surat harus berisi huruf",
      "string.empty": "alamat surat tidak boleh kosong",
      "any.required": "alamat surat harus diisi",
    }),
    perihal: Joi.string().required().messages({
      "string.base": "perihal surat harus berisi huruf",
      "string.empty": "perihal surat tidak boleh kosong",
      "any.required": "perihal surat harus diisi",
    }),
    keterangan: Joi.string().required().messages({
      "string.base": "keterangan surat harus berisi huruf",
      "string.empty": "keterangan surat tidak boleh kosong",
      "any.required": "keterangan surat harus diisi",
    }),
    tujuan: Joi.required().messages({
      "any.required": "tujuan surat harus diisi",
    }),
  }),

  // edit validation
  edit: Joi.object({
    nomer_urut: Joi.number().messages({
      "number.base": "nomor urut surat harus berupa angka",
      "number.empty": "nomor urut surat tidak boleh kosong",
    }),
    nomer_agenda: Joi.string().messages({
      "string.base": "nomer_agenda surat harus berisi huruf",
      "string.empty": "nomer_agenda surat tidak boleh kosong",
    }),
    kode_arsip: Joi.string().messages({
      "string.base": "kode_arsip surat harus berisi huruf",
      "string.empty": "kode_arsip surat tidak boleh kosong",
    }),
    tanggal_terima: Joi.string().messages({
      "string.base": "tanggal_terima surat harus berisi huruf",
      "string.empty": "tanggal_terima surat tidak boleh kosong",
    }),
    tanggal_surat: Joi.string().messages({
      "string.base": "tanggal_surat surat harus berisi huruf",
      "string.empty": "tanggal_surat surat tidak boleh kosong",
    }),
    nomer_surat: Joi.string().messages({
      "string.base": "nomer_surat surat harus berisi huruf",
      "string.empty": "nomer_surat surat tidak boleh kosong",
    }),
    asal: Joi.string().messages({
      "string.base": "asal surat harus berisi huruf",
      "string.empty": "asal surat tidak boleh kosong",
    }),
    alamat: Joi.string().messages({
      "string.base": "alamat surat harus berisi huruf",
      "string.empty": "alamat surat tidak boleh kosong",
    }),
    perihal: Joi.string().messages({
      "string.base": "perihal surat harus berisi huruf",
      "string.empty": "perihal surat tidak boleh kosong",
    }),
    keterangan: Joi.string().messages({
      "string.base": "keterangan surat harus berisi huruf",
      "string.empty": "keterangan surat tidak boleh kosong",
    }),
  }),
};
