// const Joi = require("joi");
const contactsService = require("../models/contactsService");
const { HttpError, ctrlWrapper } = require("../helpers");

// const schemaContactsValidation = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net", "org"] },
//     })
//     .required(),
//   phone: Joi.string().min(6).required(),
// });

const getAll = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  // const { error } = schemaContactsValidation.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }

  res.json({
    message: "Delete success",
  });
};

const updateById = async (req, res) => {
  // const { error } = schemaContactsValidation.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteContact: ctrlWrapper(deleteContact),
  updateById: ctrlWrapper(updateById),
};
