import joi from "joi";

/*
    Usando joi, podemos crear esquemas y validar los datos
    https://joi.dev/api/
    npm i joi
    podemos usarlo para hacer el de producto, el de id, el de carrito el que quieran!
*/

// nos devuelve el schema que va a ser una función a la que podemos pasarle un objeto y lo valide, si las propiedades estan bien van a devolver un objeto y si no, devuelve una excepción que podemos atrapar con el catch
// Se puede ver el uso en el archivo del product router, linea 42
const producto = joi.object({
  nombre: joi.string().min(3).max(45).required(),
  descripcion: joi.string().min(3).max(100).required(),
  codigo: joi.string().min(3).max(6).required(),
  foto: joi.string().min(3).max(150).required(),
  precio: joi.number().required(),
  stock: joi.number().required(),
  timestamp: joi.string().required(),
});

export const JOI_VALIDATOR = { producto };