
import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import pedidosModel from "../models/pedidos.js";

// Inicializamos el modelo (Patrón que usabas)
const Pedidos = pedidosModel.init(sequelize, DataTypes);

class PedidosService {
    async getAll() {
        return await Pedidos.findAll();
    }

    async getById(id) {
        return await Pedidos.findByPk(id);
    }

    async create(data) {
        return await Pedidos.create(data);
    }

    async update(id, data) {
        const item = await Pedidos.findByPk(id);
        if (!item) return null;
        return await item.update(data);
    }

    async delete(id) {
        const item = await Pedidos.findByPk(id);
        if (!item) return null;
        await item.destroy();
        return true;
    }
}

export default new PedidosService();
