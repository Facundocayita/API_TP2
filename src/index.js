/* Punto de entrada: levanta el server y conecta DB */
require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./connection/connection");

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión a DB OK");

        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`🚀 API tp2-venta-pc en http://localhost:${PORT}/api/v1`);
        });
    } catch (err) {
        console.error("❌ Error conectando a la DB:", err.message);
        process.exit(1);
    }
})();
