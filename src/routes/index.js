/* Monta subrutas /users, /categorias, /productos y un /health */
const express = require("express");
const router = express.Router();
const categoriaRoutes = require("./categoriaRoutes");
const productoRoutes = require("./productoRoutes");

router.get("/health", (req, res) => res.json({ status: "ok" }));
router.use("/categorias", categoriaRoutes);
router.use("/productos", productoRoutes);

module.exports = router;
