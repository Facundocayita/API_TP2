/* Registra modelos y asociaciones en un solo lugar */
const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");

// Import/define modelos
const User = require("./User")(sequelize, DataTypes);
const Categoria = require("./Categoria")(sequelize, DataTypes);
const Producto = require("./Producto")(sequelize, DataTypes);

// Asociaciones (1:N) Categoria → Producto
Categoria.hasMany(Producto, { foreignKey: "categoriaId", as: "productos" });
Producto.belongsTo(Categoria, { foreignKey: "categoriaId", as: "categoria" });

module.exports = { sequelize, User, Categoria, Producto };
