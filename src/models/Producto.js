/* Producto: pertenece a una categoria (categoriaId) */
module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define(
        "Producto",
        {
            id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            nombre: { type: DataTypes.STRING(150), allowNull: false },
            descripcion: { type: DataTypes.TEXT, allowNull: true },
            precio: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
            stock: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
            categoriaId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
        },
        {
            tableName: "productos",
            timestamps: true,
            underscored: true
        }
    );
    return Producto;
};
