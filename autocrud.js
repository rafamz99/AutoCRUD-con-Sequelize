import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// --- CONFIGURACIÓN ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelsPath = path.join(__dirname, "models");
const servicesPath = path.join(__dirname, "services");
const controllersPath = path.join(__dirname, "controllers");
const baseControllerDir = path.join(controllersPath, "base");
const routesPath = path.join(__dirname, "routes");

// Crear carpetas si no existen
[servicesPath, controllersPath, baseControllerDir, routesPath].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Función auxiliar: Crea SOLO si no existe (Protege tu código personalizado)
const createIfNotExists = (filePath, content) => {
    if (fs.existsSync(filePath)) {
        console.log(`⚠️  OMITIDO (Ya existe): ${path.basename(filePath)}`);
    } else {
        fs.writeFileSync(filePath, content);
        console.log(`✅  CREADO: ${path.basename(filePath)}`);
    }
};

// ==========================================
// BUCLE PRINCIPAL (RECORRE LAS TABLAS)
// ==========================================
const filesToExclude = ["index.js", "init-models.js"];
const models = fs.readdirSync(modelsPath)
    .filter(f => f.endsWith(".js") && !filesToExclude.includes(f));

console.log("------------------------------------------------");

for (const modelFile of models) {
    const modelName = path.basename(modelFile, ".js"); // ej: productos
    const modelClass = modelName.charAt(0).toUpperCase() + modelName.slice(1); // ej: Productos

    // ---------------------------------------------------------
    // 1. SERVICIO (Se crea una vez, no se sobrescribe)
    // ---------------------------------------------------------
    const serviceContent = `
import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import ${modelName}Model from "../models/${modelFile}";

const ${modelClass} = ${modelName}Model(sequelize, DataTypes);

class ${modelClass}Service {
    async getAll() { return await ${modelClass}.findAll(); }
    async getById(id) { return await ${modelClass}.findByPk(id); }
    async create(data) { return await ${modelClass}.create(data); }
    async update(id, data) {
        const item = await ${modelClass}.findByPk(id);
        if (!item) return null;
        return await item.update(data);
    }
    async delete(id) {
        const item = await ${modelClass}.findByPk(id);
        if (!item) return null;
        await item.destroy();
        return true;
    }
}

export default new ${modelClass}Service();
`;
    createIfNotExists(path.join(servicesPath, `${modelName}Service.js`), serviceContent);

    // ---------------------------------------------------------
    // 2. CONTROLLER BASE ESPECÍFICO (SE SOBRESCRIBE SIEMPRE)
    //    Ej: controllers/base/productosControllerBase.js
    // ---------------------------------------------------------
    const baseControllerName = `${modelName}ControllerBase`; // nombre archivo
    const baseClassName = `${modelClass}ControllerBase`; // nombre clase

    const baseControllerContent = `
export class ${baseClassName} {
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
`;
    // Escribimos directamente con fs.writeFileSync (SOBRESCRIBIR SIEMPRE)
    fs.writeFileSync(path.join(baseControllerDir, `${baseControllerName}.js`), baseControllerContent);
    console.log(`🔄 BASE ACTUALIZADO: ${baseControllerName}.js`);


    // ---------------------------------------------------------
    // 3. CONTROLLER HIJO (HEREDA DEL BASE ESPECÍFICO)
    //    Ej: controllers/productosController.js
    // ---------------------------------------------------------
    const controllerContent = `
import { ${baseClassName} } from "./base/${baseControllerName}.js";
import ${modelName}Service from "../services/${modelName}Service.js";

class ${modelClass}Controller extends ${baseClassName} {
    constructor() {
        super(${modelName}Service);
    }
}

export default new ${modelClass}Controller();
`;
    createIfNotExists(path.join(controllersPath, `${modelName}Controller.js`), controllerContent);


    // ---------------------------------------------------------
    // 4. RUTAS
    // ---------------------------------------------------------
    const routeContent = `
import express from "express";
import controller from "../controllers/${modelName}Controller.js";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
`;
    createIfNotExists(path.join(routesPath, `${modelName}Routes.js`), routeContent);
}

console.log("------------------------------------------------");
console.log("🎉 Proceso finalizado.");