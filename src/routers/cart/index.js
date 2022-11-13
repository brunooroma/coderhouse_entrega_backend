import { Router } from "express";
import { DATE_UTILS, ERRORS_UTILS } from "../../utils/index.js";
import { CartDao, ProductoDao } from "../../Dao/index.js";

const router = Router();

router.post("/", async (req, res) => {
  const baseCart = { timestamp: DATE_UTILS.getTimestamp(), productos: [] };

  const cart = await CartDao.save(baseCart);

  res.send({ success: true, cartId: cart.id });
});

router.post("/:cartId/productos", async (req, res) => {
  const { productoId } = req.body;
  const { cartId } = req.params;

  const cart = await CartDao.getById(Number(cartId));

  if (!cart)
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART });

  const producto = await ProductoDao.getById(Number(productoId));

  if (!producto)
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

  cart.productos.push(producto);

  const updatedCart = await CartDao.updateById(Number(cartId), cart);

  res.send({ success: true, cart: updatedCart });
});

router.delete('/:cartId', async (req, res) => {
    try {
      const {cartId} = req.params; 
  
      await CartDao.deleteById(Number(cartId))
      return res.send({success: true})
    } catch (error) {
      console.log(error)
      return res.send({error: 'no se pudo eliminar el carrito'})
    }
  })

export { router as CartRouter };