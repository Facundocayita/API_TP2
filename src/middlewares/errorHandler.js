/* Manejo centralizado de errores */
module.exports = (err, req, res, next) => {
    console.error("💥 Error:", err);

    const status = err.status || 500;
    const message = err.message || "Error interno del servidor";

    // Podés enriquecer con códigos 400/404/409 según el tipo de error
    res.status(status).json({ error: message });
};
