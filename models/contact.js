const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
const dataRegExp = /^(\+380\s|\+380|\b0)([3-9][0-9]\s?\d{3}\s?\d{2}\s?\d{2})$/;

const contactSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    match: dataRegExp,
    required: [true, "phone is required"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

contactSchema.post("save", handleMongooseError);

const schemaContactsValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org"] },
    })
    .required(),
  phone: Joi.string().min(6).pattern(dataRegExp).required(),
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const schemas = {
  schemaContactsValidation,
  updateFavoriteSchema,
};
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
