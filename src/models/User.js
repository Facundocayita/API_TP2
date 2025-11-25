const bcrypt = require("bcryptjs");

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

    //Hashea Contraseña
    User.beforeCreate(async (user) => {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.passwordHash, salt);
        user.passwordHash = hash;
    });

    // valida contraseña
    User.decodeVerifyPass = async (plainPassword, hash) => {
        return await bcrypt.compare(plainPassword, hash);
    };

    return User;
};
