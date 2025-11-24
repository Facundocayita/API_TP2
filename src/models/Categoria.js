/* 1 categoria tiene muchos productos */
module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define(
        "Categoria",
        {
            id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            nombre: { type: DataTypes.STRING(120), allowNull: false, unique: true },
            descripcion: { type: DataTypes.TEXT, allowNull: true }
        },
        {
            tableName: "categorias",
            timestamps: true,
            underscored: true
        }
    );
    return Categoria;
};
