// Rutas REST completas para productos (listar, ver detalle, crear, actualizar y eliminar)
const express = require("express");
const router = express.Router();
const ProductoController = require("../controller/ProductoController");

router.get("/", ProductoController.list);
router.get("/:id", ProductoController.getById);
router.post("/", ProductoController.create);
router.put("/:id", ProductoController.update);
router.patch("/:id", ProductoController.update);
router.delete("/:id", ProductoController.remove);
router.post('/descontar-stock', ProductoController.descontarStock)

module.exports = router;

