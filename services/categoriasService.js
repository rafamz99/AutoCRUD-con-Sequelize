
import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import categoriasModel from "../models/categorias.js";

// Inicializamos el modelo (Patrón que usabas)
const Categorias = categoriasModel.init(sequelize, DataTypes);

class CategoriasService {
    async getAll() {
        return await Categorias.findAll();
    }

    async getById(id) {
        return await Categorias.findByPk(id);
    }

    async create(data) {
        return await Categorias.create(data);
    }

    async update(id, data) {
        const item = await Categorias.findByPk(id);
        if (!item) return null;
        return await item.update(data);
    }

    async delete(id) {
        const item = await Categorias.findByPk(id);
        if (!item) return null;
        await item.destroy();
        return true;
    }
}

export default new CategoriasService();
