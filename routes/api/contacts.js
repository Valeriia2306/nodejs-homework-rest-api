const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.schemaContactsValidation), ctrl.add);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);
router.delete("/:id", isValidId, ctrl.deleteContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.schemaContactsValidation),
  ctrl.updateById
);

module.exports = router;
