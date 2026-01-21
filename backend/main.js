import express from "express";
import { conectarDB } from "./config/database.js";
import usuariosRoutes from "./modules/usuarios/usuario.routes.js";
import authConfig from "./config/auth.js";
import authRoutes from "./modules/auth/auth.routes.js"
import { verificarAutenticacion } from "./config/auth.js";
import proveedoresRoutes from "./modules/proveedores/proveedores.routes.js";
import productoRoutes from "./modules/productos/producto.routes.js"
import cors from "cors";
const app = express();
const port = 3000;

conectarDB();
authConfig();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.use("/auth", authRoutes)

app.use(verificarAutenticacion);

app.use("/productos", productoRoutes)

app.use("/usuarios", usuariosRoutes);

app.use("/proveedores", proveedoresRoutes);

app.listen(port, () => {
    console.log(`La app esta funcionando en el puerto ${port}`);
})