/* 404 para rutas inexistentes */
module.exports = (req, res, next) => {
    res.status(404).json({ error: "Recurso no encontrado" });
};
