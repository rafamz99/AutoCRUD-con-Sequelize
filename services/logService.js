
import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import logModel from "../models/log.js";

// Inicializamos el modelo (Patrón que usabas)
const Log = logModel.init(sequelize, DataTypes);

class LogService {
    async getAll() {
        return await Log.findAll();
    }

    async getById(id) {
        return await Log.findByPk(id);
    }

    async create(data) {
        return await Log.create(data);
    }

    async update(id, data) {
        const item = await Log.findByPk(id);
        if (!item) return null;
        return await item.update(data);
    }

    async delete(id) {
        const item = await Log.findByPk(id);
        if (!item) return null;
        await item.destroy();
        return true;
    }
}

export default new LogService();
