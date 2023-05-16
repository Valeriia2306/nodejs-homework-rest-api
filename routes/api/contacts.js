const express = require("express");
const ctrl = require("../../controllers/contacts");
// const Joi = require("joi");
// const contactsService = require("../../models/contactsService");
// const { HttpError } = require("../../helpers");

const router = express.Router();
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");
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

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(schemas.schemaContactsValidation), ctrl.add);

router.delete("/:id", ctrl.deleteContact);

router.put(
  "/:id",
  validateBody(schemas.schemaContactsValidation),
  ctrl.updateById
);

module.exports = router;
