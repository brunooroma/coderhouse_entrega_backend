import { config } from "../config/index.js";
import { ContainerFilesystem } from "../Containers/index.js";

const ProductoDao = new ContainerFilesystem(config.DATABASES.filesystem.PRODUCTOS_NOMBRE);
const CartDao = new ContainerFilesystem(config.DATABASES.filesystem.CARTS_NOMBRE);

export { ProductoDao, CartDao };