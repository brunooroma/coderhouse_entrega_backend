import express from "express";
import { config } from "./config/index.js";
import { ProductoRouter,CartRouter } from "./routers/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/productos", ProductoRouter);
app.use("/api/carrito", CartRouter);

const server = app.listen(config.SERVER.PORT, () => 
    console.log(`Server ${server.address().port}`)
);
