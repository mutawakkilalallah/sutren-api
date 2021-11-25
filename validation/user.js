const Joi = require("joi");

module.exports = {
  // create validation
  create: Joi.object({
    nama: Joi.string().required().messages({
      "string.base": "nama harus berisi huruf",
      "string.empty": "nama tidak boleh kosong",
      "any.required": "nama harus harus diisi",
    }),
    username: Joi.string().required().messages({
      "string.base": "username harus berisi huruf",
      "string.empty": "username tidak boleh kosong",
      "any.required": "username harus harus diisi",
    }),
    password: Joi.string().required().messages({
      "string.base": "password harus berisi huruf",
      "string.empty": "password tidak boleh kosong",
      "any.required": "password harus harus diisi",
    }),
    akses: Joi.string()
      .required()
      .valid("sysadmin", "admin", "supervisor")
      .messages({
        "any.required": "akses harus harus diisi",
        "string.empty": "akses tidak boleh kosong",
        "any.only": "akses tidak tersedia",
        "any.required": "akses harus harus diisi",
      }),
  }),

  // login validation
  login: Joi.object({
    username: Joi.string().required().messages({
      "string.base": "username harus berisi huruf",
      "string.empty": "username tidak boleh kosong",
      "any.required": "username harus harus diisi",
    }),
    password: Joi.string().required().messages({
      "string.base": "username harus berisi huruf",
      "string.empty": "username tidak boleh kosong",
      "any.required": "password harus harus diisi",
    }),
  }),

  // update validation
  update: Joi.object({
    nama: Joi.string().messages({
      "string.base": "nama harus berisi huruf",
      "string.empty": "nama tidak boleh kosong",
    }),
    username: Joi.string().messages({
      "string.base": "username harus berisi huruf",
      "string.empty": "username tidak boleh kosong",
    }),
    password: Joi.string().messages({
      "string.base": "password harus berisi huruf",
      "string.empty": "password tidak boleh kosong",
    }),
    akses: Joi.string().valid("sysadmin", "admin", "supervisor").messages({
      "any.required": "akses harus harus diisi",
      "string.empty": "akses tidak boleh kosong",
      "any.only": "akses tidak tersedia",
    }),
  }),
};
