const UserService = require("../services/UserService");

const meta = (count, page, limit) => ({
    total: count,
    page,
    limit,
    totalPages: Math.ceil(count / limit)
});

module.exports = {
    async list(req, res, next) {
        try {
            const page = Math.max(1, +(req.query.page || 1));
            const limit = Math.max(1, Math.min(100, +(req.query.limit || 10)));

            const { count, rows } = await UserService.list({
                limit,
                offset: (page - 1) * limit
            });

            res.json({ data: rows, meta: meta(count, page, limit) });
        } catch (e) {
            next(e);
        }
    },

    async getById(req, res, next) {
        try {
            const item = await UserService.getById(req.params.id);
            if (!item) return res.status(404).json({ error: "Usuario no encontrado" });
            res.json({ data: item });
        } catch (e) {
            next(e);
        }
    },

    async create(req, res, next) {
        try {
            const { nombre, email, passwordHash, rol } = req.body;

            if (!nombre || !email || !passwordHash) {
                return res.status(400).json({
                    error: "Campos requeridos: nombre, email, passwordHash"
                });
            }

            const created = await UserService.create(req.body);
            res.status(201).json({ data: created });
        } catch (e) {
            next(e);
        }
    },

    async update(req, res, next) {
        try {
            const updated = await UserService.update(req.params.id, req.body);
            if (!updated) return res.status(404).json({ error: "Usuario no encontrado" });
            res.json({ data: updated });
        } catch (e) {
            next(e);
        }
    },

    async remove(req, res, next) {
        try {
            const ok = await UserService.remove(req.params.id);
            if (!ok) return res.status(404).json({ error: "Usuario no encontrado" });
            res.status(204).send();
        } catch (e) {
            next(e);
        }
    },

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    error: "Campos requeridos: email, password"
                });
            }
            const user = await UserService.verifyPassword(email, password);

            if (user === null) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            if (user === false) {
                return res.status(401).json({ error: "Contraseña incorrecta" });
            }

            // jwt
            res.json({ ok: true, data: user });

        } catch (e) {
            next(e);
        }
    }
};