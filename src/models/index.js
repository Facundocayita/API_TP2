const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/connection");

// Importa/define modelos
const User = require("./User")(sequelize, DataTypes);
const Categoria = require("./Categoria")(sequelize, DataTypes);
const Producto = require("./Producto")(sequelize, DataTypes);

// Asociacio (1:Muchos) Categoria → Producto
Categoria.hasMany(Producto, { foreignKey: "categoriaId", as: "productos" });
Producto.belongsTo(Categoria, { foreignKey: "categoriaId", as: "categoria" });

module.exports = { sequelize, User, Categoria, Producto };
