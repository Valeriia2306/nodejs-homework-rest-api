const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.schemaContactsValidation),
  ctrl.add
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);
router.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.schemaContactsValidation),
  ctrl.updateById
);

module.exports = router;
