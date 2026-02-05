# 🚀 API AutoCRUD con Node.js y Sequelize

Este proyecto es una API RESTful que genera automáticamente el backend a partir de una base de datos MySQL existente.

## 📋 Índice de Contenidos

1.  Instalación de dependencias
2.  Configuración de entorno (.env)
3.  Ejecución de migraciones/seed
4.  Ejecutar AutoCRUD
5.  Lanzar el servidor 
6.  Ejemplos de Endpoints

---

## 1. Cómo instalar dependencias

Para descargar e instalar todas las librerías necesarias (Express, Sequelize, MySQL2, etc.), abre una terminal en la raíz del proyecto y ejecuta:

`bash npm install`

## 2. Cómo configurar .env
Aunque es posible usar un archivo .env, este proyecto está preconfigurado para un entorno de desarrollo rápido. Las credenciales de conexión se gestionan actualmente en:

Archivo: config/db.js (para la conexión del servidor).

Archivo: package.json (script gen-models para el generador).

Parámetros por defecto:

Host: localhost

Usuario: root

Password: "" (vacía)

Base de datos: (Configurada en el script gen-models)

Si se desea cambiar la configuración, editar directamente config/db.js.

## 3. Cómo ejecutar migraciones/seed
Este proyecto utiliza una metodología "Database First" (Base de datos primero), por lo que no se utilizan archivos de migración ni seeds tradicionales.

El proceso equivalente es el siguiente:

Crear la tabla manualmente en MySQL/phpMyAdmin.

Importar la estructura al proyecto ejecutando:

npm run gen-models
(Este comando lee la base de datos y genera los archivos en la carpeta /models automáticamente).

## 4. Cómo ejecutar el AutoCRUD
Una vez generados los modelos (Paso 3), para crear automáticamente los Servicios, Controladores y Rutas, ejecuta:

node autocrud.js
Este script detectará los nuevos archivos en /models y generará todo el código necesario para que la API funcione sin escribir código manual.

## 5. Cómo lanzar el servidor
Para iniciar la API, ejecuta el siguiente comando:

node server.js
El servidor escuchará en el puerto 3000 y cargará automáticamente todas las rutas disponibles.

## 6. 6. Ejemplos de endpointsA continuación se detallan los endpoints generados para un recurso de ejemplo (suponiendo una tabla llamada log2).
GET	/api/log2	Obtener todos los registros
POST	/api/log2	Crear un nuevo registro	{ "mensaje": "Test", "nivel": 1 }
