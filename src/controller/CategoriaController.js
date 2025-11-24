const CategoriaService = require("../services/CategoriaService");
const meta = (count, page, limit) => ({ total: count, page, limit, totalPages: Math.ceil(count / limit) });

module.exports = {
    async list(req, res, next) {
        try {
            const page = Math.max(1, +(req.query.page || 1));
            const limit = Math.max(1, Math.min(100, +(req.query.limit || 10)));
            const { count, rows } = await CategoriaService.list({ limit, offset: (page - 1) * limit });
            res.json({ data: rows, meta: meta(count, page, limit) });
        } catch (e) { next(e); }
    },
    async getById(req, res, next) {
        try {
            const c = await CategoriaService.getById(req.params.id);
            if (!c) return res.status(404).json({ error: "Categoría no encontrada" });
            res.json({ data: c });
        } catch (e) { next(e); }
    },
    async create(req, res, next) {
        try {
            const { nombre, descripcion } = req.body;
            if (!nombre) return res.status(400).json({ error: "El campo 'nombre' es requerido" });
            const created = await CategoriaService.create({ nombre, descripcion });
            res.status(201).json({ data: created });
        } catch (e) {
            if (e.name === "SequelizeUniqueConstraintError") { e.status = 409; e.message = "La categoría ya existe"; }
            next(e);
        }
    },
    async update(req, res, next) {
        try {
            const updated = await CategoriaService.update(req.params.id, req.body);
            if (!updated) return res.status(404).json({ error: "Categoría no encontrada" });
            res.json({ data: updated });
        } catch (e) { next(e); }
    },
    async remove(req, res, next) {
        try {
            const ok = await CategoriaService.remove(req.params.id);
            if (!ok) return res.status(404).json({ error: "Categoría no encontrada" });
            res.status(204).send();
        } catch (e) { next(e); }
    }
};

