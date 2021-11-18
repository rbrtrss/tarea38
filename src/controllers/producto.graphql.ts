import { ProductosTC } from '../models/productos.model';

export const ProductosQuery = {
  productoOne: ProductosTC.getResolver('findOne'),
  productoMany: ProductosTC.getResolver('findMany'),
};

export const ProductosMutation = {
  productoCreateOne: ProductosTC.getResolver('createOne'),
  productoCreateMany: ProductosTC.getResolver('createMany'),
};
