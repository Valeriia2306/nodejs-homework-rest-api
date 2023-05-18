const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

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
