import carrito from '../models/carrito.model';
import controlCarrito from '../controllers/carrito.controller';
import controlProductos from '../controllers/producto.controllers';
import { Router } from 'express';

const routerCarrito = Router();

routerCarrito.get('/listar', controlCarrito.muestraArticulo);

routerCarrito.get(
  '/listar/:id',
  controlCarrito.articuloExiste,
  controlCarrito.muestraArticulo
);

routerCarrito.post(
  '/agregar/:id_producto',
  controlCarrito.productoExiste,
  controlCarrito.agregaArticulo
);

routerCarrito.delete(
  '/borrar/:id',
  controlCarrito.articuloExiste,
  controlCarrito.eliminaArticulo
);

routerCarrito.get('/checkout', controlCarrito.checkout);

export default routerCarrito;
