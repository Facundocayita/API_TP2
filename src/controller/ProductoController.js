const ProductoService = require("../services/ProductoService");
const meta = (count, page, limit) => ({ total: count, page, limit, totalPages: Math.ceil(count / limit) });

async function descontarStock(req, res, next) {
    try {
        const items = req.body.items || req.body 
        await ProductoService.descontarStock(items)
        res.status(200).json({ ok: true, message: 'Stock actualizado correctamente.' })
    } catch (error) {
        next(error)  
    }
}

module.exports = {
    async list(req, res, next) {
        try {
            const page = Math.max(1, +(req.query.page || 1));
            const limit = Math.max(1, Math.min(100, +(req.query.limit || 10)));
            const { q, categoriaId } = req.query;
            const { count, rows } = await ProductoService.list({ limit, offset: (page - 1) * limit, q, categoriaId });
            res.json({ data: rows, meta: meta(count, page, limit) });
        } catch (e) { next(e); }
    },
    async getById(req, res, next) {
        try {
            const item = await ProductoService.getById(req.params.id);
            if (!item) return res.status(404).json({ error: "Producto no encontrado" });
            res.json({ data: item });
        } catch (e) { next(e); }
    },
    async create(req, res, next) {
        try {
            const { nombre, precio, categoriaId } = req.body;
            if (!nombre || precio == null || categoriaId == null) {
                return res.status(400).json({ error: "Campos requeridos: nombre, precio, categoriaId" });
            }
            const created = await ProductoService.create(req.body);
            res.status(201).json({ data: created });
        } catch (e) { next(e); }
    },
    async update(req, res, next) {
        try {
            const updated = await ProductoService.update(req.params.id, req.body);
            if (!updated) return res.status(404).json({ error: "Producto no encontrado" });
            res.json({ data: updated });
        } catch (e) { next(e); }
    },
    async remove(req, res, next) {
        try {
            const ok = await ProductoService.remove(req.params.id);
            if (!ok) return res.status(404).json({ error: "Producto no encontrado" });
            res.status(204).send();
        } catch (e) { next(e); }
    }
    , descontarStock
};
