import express from "express";
import productoRoutes from "./routes/productosRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import categoriasRoutes from "./routes/categoriasRoutes.js";
import pedidosRoutes from "./routes/pedidosRoutes.js";
import detalles_pedidoRoutes from "./routes/detalles_pedidoRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";

import { sequelize } from "./config/db.js";
import initModels from "./models/init-models.js";
const app = express();
app.use(express.json());
const models = initModels(sequelize);
// Rutas
app.use("/api/productos", productoRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/detalles_pedido", detalles_pedidoRoutes);
app.use("/api/productos", productosRoutes);
// Sincronizar base de datos
(async () => {
try {
await sequelize.sync({ alter: true });
console.log("✅ Tablas sincronizadas.");
} catch (error) {
console.error("❌ Error al sincronizar las tablas:", error);
}
})();
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));