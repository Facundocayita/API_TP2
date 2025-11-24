// src/services/ProductoService.js
const { Producto, Categoria } = require("../models");
const { Op } = require("sequelize");


async function descontarStock(items) {
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("No se recibieron items para descontar.");
    }

    await Producto.sequelize.transaction(async (t) => {
        for (const item of items) {
            const productoId = item.productoId || item.id;
            const cantidad = Number(item.cantidad) || 0;

            if (!productoId || cantidad <= 0) continue;

            const producto = await Producto.findByPk(productoId, { transaction: t });
            if (!producto) {
                throw new Error(`Producto ${productoId} no existe.`);
            }

            const stockActual = Number(producto.stock) || 0;
            if (stockActual < cantidad) {
                throw new Error(`Stock insuficiente para el producto ${producto.nombre}.`);
            }

            producto.stock = stockActual - cantidad;
            await producto.save({ transaction: t });
        }
    });
}

module.exports = {
    list: ({ limit = 10, offset = 0, q, categoriaId }) => {
        const where = {};
        if (q) where.nombre = { [Op.substring]: q };
        if (categoriaId) where.categoriaId = categoriaId;

        return Producto.findAndCountAll({
            where,
            limit: +limit,
            offset: +offset,
            order: [["id", "DESC"]],
            include: [{ model: Categoria, as: "categoria", attributes: ["id", "nombre"] }]
        });
    },

    getById: (id) =>
        Producto.findByPk(id, {
            include: [{ model: Categoria, as: "categoria", attributes: ["id", "nombre"] }]
        }),

    create: (payload) => Producto.create(payload),

    update: async (id, payload) => {
        const item = await Producto.findByPk(id);
        if (!item) return null;
        await item.update(payload);
        return item;
    },

    remove: async (id) => {
        const item = await Producto.findByPk(id);
        if (!item) return null;
        await item.destroy();
        return true;
    },

    descontarStock
};
