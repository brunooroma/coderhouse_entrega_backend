import dotenv from "dotenv";
dotenv.config();

const PRODUCTOS_NOMBRE = "productos";
const CARTS_NOMBRE = "carts";

const config = {
  SERVER: {
    PORT: process.env.PORT || 8080,
  },
  DATABASES: {
    filesystem: {
      PRODUCTOS_NOMBRE,
      CARTS_NOMBRE,
    },
  },
};

export { config };