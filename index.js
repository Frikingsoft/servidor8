import express from "express"
import hbs from "hbs"
import { fileURLToPath } from "url"; // Para obtener la ruta del archivo actual
import { dirname } from "path"; // Para trabajar con rutas de archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const servidor = express()

servidor.listen(80)
servidor.use(express.json())
servidor.use(express.static(`${__dirname}/publicos`))
servidor.set('view engine', 'hbs')
hbs.registerPartials(`${__dirname}/views/partials`)
servidor.get("/",(req,res)=>{
    res.status(200).render("index.hbs")

})
servidor.get("/login",(req,res)=>{
    res.render("login.hbs")
})
servidor.post("/login", (req, res) => {
    const { Usuario, Contraseña } = req.body
    console.log(`Usuario: ${Usuario}, Contraseña: ${Contraseña}`)
    res.status(200).send("Datos recibidos")
});
