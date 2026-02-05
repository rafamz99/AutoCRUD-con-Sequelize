
import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import detalles_pedidoModel from "../models/detalles_pedido.js";

// Inicializamos el modelo (Patrón que usabas)
const Detalles_pedido = detalles_pedidoModel.init(sequelize, DataTypes);

class Detalles_pedidoService {
    async getAll() {
        return await Detalles_pedido.findAll();
    }

    async getById(id) {
        return await Detalles_pedido.findByPk(id);
    }

    async create(data) {
        return await Detalles_pedido.create(data);
    }

    async update(id, data) {
        const item = await Detalles_pedido.findByPk(id);
        if (!item) return null;
        return await item.update(data);
    }

    async delete(id) {
        const item = await Detalles_pedido.findByPk(id);
        if (!item) return null;
        await item.destroy();
        return true;
    }
}

export default new Detalles_pedidoService();
