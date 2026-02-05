
import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import productosModel from "../models/productos.js";

// Inicializamos el modelo (Patrón que usabas)
const Productos = productosModel.init(sequelize, DataTypes);

class ProductosService {
    async getAll() {
        return await Productos.findAll();
    }

    async getById(id) {
        return await Productos.findByPk(id);
    }

    async create(data) {
        return await Productos.create(data);
    }

    async update(id, data) {
        const item = await Productos.findByPk(id);
        if (!item) return null;
        return await item.update(data);
    }

    async delete(id) {
        const item = await Productos.findByPk(id);
        if (!item) return null;
        await item.destroy();
        return true;
    }
}

export default new ProductosService();
