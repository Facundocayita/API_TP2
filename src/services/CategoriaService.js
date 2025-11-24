const { Categoria } = require("../models");

module.exports = {
    list: ({ limit = 10, offset = 0 }) =>
        Categoria.findAndCountAll({ limit: +limit, offset: +offset, order: [["id", "DESC"]] }),

    getById: (id) => Categoria.findByPk(id),

    create: (payload) => Categoria.create(payload),

    update: async (id, payload) => {
        const cat = await Categoria.findByPk(id);
        if (!cat) return null;
        await cat.update(payload);
        return cat;
    },

    remove: async (id) => {
        const cat = await Categoria.findByPk(id);
        if (!cat) return null;
        await cat.destroy();
        return true;
    }
};
