import express from "express";
import hbs from "hbs";
import { fileURLToPath } from "url"; // Para obtener la ruta del archivo actual
import { dirname } from "path"; // Para trabajar con rutas de archivo
import { encriptar_contra } from "./funciones/funciones.js";
import mysql from "mysql2/promise"; // Usando la versión Promise de mysql2

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const servidor = express();

servidor.listen(80);
servidor.use(express.json());
servidor.use(express.static(`${__dirname}/publicos`));
servidor.set("view engine", "hbs");
hbs.registerPartials(`${__dirname}/views/partials`);

const conexion = await mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'tu_basedatos'
});

servidor.get("/", (req, res) => {
    res.status(200).render("index.hbs");
});

servidor.get("/login", (req, res) => {
    res.render("login.hbs");
});

servidor.post("/login", async (req, res) => {
    let { Usuario, Contraseña } = req.body;
    Contraseña = encriptar_contra(Contraseña);
    console.log(`Usuario: ${Usuario}, Contraseña: ${Contraseña}`);

    // Función para guardar en la base de datos
    const guardar_db = async (Usuario, Contraseña) => {
        try {
            const query = 'INSERT INTO usuarios (usuario, contraseña) VALUES (?, ?)';
            await conexion.execute(query, [Usuario, Contraseña]);
            console.log("Datos guardados en la base de datos");
        } catch (error) {
            console.error("Error al guardar en la base de datos:", error);
        }
    };

    // Llamada a la función para guardar en la base de datos
    await guardar_db(Usuario, Contraseña);

    res.status(200).send("Datos recibidos y guardados");
});
