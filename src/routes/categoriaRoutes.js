// Rutas REST completas para categorías
const express = require("express");
const router = express.Router();
const CategoriaController = require("../controller/CategoriaController");

router.get("/", CategoriaController.list);
router.get("/:id", CategoriaController.getById);
router.post("/", CategoriaController.create);
router.put("/:id", CategoriaController.update);
router.patch("/:id", CategoriaController.update);
router.delete("/:id", CategoriaController.remove);

module.exports = router;
