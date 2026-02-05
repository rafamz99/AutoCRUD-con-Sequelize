
import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import clientesModel from "../models/clientes.js";

// Inicializamos el modelo (Patrón que usabas)
const Clientes = clientesModel.init(sequelize, DataTypes);

class ClientesService {
    async getAll() {
        return await Clientes.findAll();
    }

    async getById(id) {
        return await Clientes.findByPk(id);
    }

    async create(data) {
        return await Clientes.create(data);
    }

    async update(id, data) {
        const item = await Clientes.findByPk(id);
        if (!item) return null;
        return await item.update(data);
    }

    async delete(id) {
        const item = await Clientes.findByPk(id);
        if (!item) return null;
        await item.destroy();
        return true;
    }
}

export default new ClientesService();
