
export class ProductosControllerBase {
    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res) => {
        try {
            const items = await this.service.getAll();
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: "Error interno", error });
        }
    };

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            if (!item) return res.status(404).json({ message: "No encontrado" });
            res.json(item);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener", error });
        }
    };

    create = async (req, res) => {
        try {
            const newItem = await this.service.create(req.body);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ message: "Error al crear", error });
        }
    };

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const updated = await this.service.update(id, req.body);
            if (!updated) return res.status(404).json({ message: "No encontrado" });
            res.json(updated);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar", error });
        }
    };

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await this.service.delete(id);
            if (!deleted) return res.status(404).json({ message: "No encontrado" });
            res.json({ message: "Eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar", error });
        }
    };
}
