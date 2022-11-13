import { Router } from "express";
import { ProductoDao } from "../../Dao/index.js";
import { verifyRole } from "../../middlewares/verifyRole.js";
import { DATE_UTILS, ERRORS_UTILS, JOI_VALIDATOR, LOGGER_UTILS } from "../../utils/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const productos = await ProductoDao.getAll();

  if(!productos){
    return res.send({error: ERRORS_UTILS.MESSAGES.NO_PRODUCT})
  }

  return res.send(productos);
});

router.get("/:id", async (req, res) => {
  const {id} = req.params

  const producto = await ProductoDao.getById(Number(id))
  return res.send(producto);
});

router.post("/", verifyRole,async (req, res) => {
try {
  const { id, nombre, descripcion, codigo, foto, precio, stock } =
  req.body;

const producto = await JOI_VALIDATOR.producto.validateAsync({
  timestamp: DATE_UTILS.getTimestamp(),
  nombre,
  descripcion,
  codigo,
  foto,
  precio,
  stock,
});

const productoCreado = await ProductoDao.save(producto);
return res.send(productoCreado);
} catch (error) {
  await LOGGER_UTILS.addLog(error)
  return res.send(error)
}
});

router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params; 

    await ProductoDao.deleteById(Number(id))
    return res.send({success: true})
  } catch (error) {
    console.log(error)
    return res.send({error: 'no se pudo eliminar el producto'})
  }
})

export { router as ProductoRouter };
