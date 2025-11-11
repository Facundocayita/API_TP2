/* Instancia de Sequelize y export */
const { Sequelize } = require("sequelize");

const {
    DB_DIALECT = "mysql",
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASS
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false
});

module.exports = { sequelize };
