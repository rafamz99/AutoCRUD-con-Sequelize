
export class ControllerBase {
    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res) => {
        try {
            const items = await this.service.getAll();
            res.json(items);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    };

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            if (!item) return res.status(404).json({ message: "No encontrado" });
            res.json(item);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener el registro", error });
        }
    };

    create = async (req, res) => {
        try {
            const newItem = await this.service.create(req.body);
            res.status(201).json(newItem);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al crear", error });
        }
    };

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const updatedItem = await this.service.update(id, req.body);
            if (!updatedItem) return res.status(404).json({ message: "No encontrado para actualizar" });
            res.json(updatedItem);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al actualizar", error });
        }
    };

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await this.service.delete(id);
            if (!deleted) return res.status(404).json({ message: "No encontrado para eliminar" });
            res.json({ message: "Eliminado correctamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al eliminar", error });
        }
    };
}
