import express from "express";
import { conectarDB } from "./config/database.js";
import usuariosRoutes from "./modules/usuarios/usuario.routes.js";

conectarDB();

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.use("/usuarios", usuariosRoutes)

app.listen(port, () => {
    console.log(`La app esta funcionando en el puerto ${port}`);
})