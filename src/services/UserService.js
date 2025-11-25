const { User } = require("../models");

module.exports = {
    list: ({ limit = 10, offset = 0 }) =>
        User.findAndCountAll({
            limit: +limit,
            offset: +offset,
            order: [["id", "DESC"]]
        }),

    getById: (id) => User.findByPk(id),

    create: (payload) => User.create(payload),

    update: async (id, payload) => {
        const user = await User.findByPk(id);
        if (!user) return null;
        await user.update(payload);
        return user;
    },

    remove: async (id) => {
        const user = await User.findByPk(id);
        if (!user) return null;
        await user.destroy();
        return true;
    },

    verifyPassword: async (email, plainPassword) => {
        const user = await User.findOne({ where: { email } });
        if (!user) return null;

        const isValid = await User.decodeVerifyPass(plainPassword, user.passwordHash);
        return isValid ? user : false;
    }
};