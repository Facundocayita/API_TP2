/* User: para futuros endpoints de auth/roles */
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            nombre: { type: DataTypes.STRING(100), allowNull: false },
            email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
            passwordHash: { type: DataTypes.STRING(255), allowNull: false },
            rol: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "CLIENTE" }
        },
        {
            tableName: "users",
            timestamps: true,
            underscored: true
        }
    );
    return User;
};
