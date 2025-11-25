/* Monta subrutas /users, /categorias, /productos y un /health */
const express = require("express");
const router = express.Router();
const categoriaRoutes = require("./categoriaRoutes");
const productoRoutes = require("./productoRoutes");
const userRoutes = require("./userRoutes"); 

router.get("/health", (req, res) => res.json({ status: "ok" }));
router.use("/categorias", categoriaRoutes);
router.use("/productos", productoRoutes);
router.use("/users", userRoutes);

module.exports = router;
