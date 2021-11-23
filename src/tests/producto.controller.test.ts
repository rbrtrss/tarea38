import httpMocks from 'node-mocks-http';
import productoControllers from '../controllers/producto.controllers';
import Productos from '../models/productos.model';
import { Request, Response, NextFunction } from 'express';
import { productoExistente } from './mock-data/producto.existente';
import { productoNuevo } from './mock-data/producto.nuevo';

describe('Controller de Productos', () => {
  let req: Request, res: Response, next: NextFunction;
  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });
  it('debe tener una funcion productoExiste', () => {
    expect(typeof productoControllers.productoExiste).toBe('function');
  });
  it('productoExiste debe llamar al metodo find del modelo con el _id del producto', async () => {
    Productos.find = jest.fn();
    req.params.id = productoExistente._id;
    await productoControllers.productoExiste(req, res, next);
    expect(Productos.find).toBeCalledWith(productoExistente._id);
  });
  it('si productoExiste no encuentra producto debe retornar estatus 404', async () => {
    Productos.find = jest.fn();
    req.params.id = productoExistente._id;
    await productoControllers.productoExiste(req, res, next);
    expect(res.statusCode).toBe(404);
  });
  it('debe tener una funcion agregaProducto', () => {
    expect(typeof productoControllers.agregaProducto).toBe('function');
  });
  it('agregaProducto debe llamar al metodo add del producto', async () => {
    Productos.add = jest.fn();
    req.body = productoNuevo;
    await productoControllers.agregaProducto(req, res, next);
    expect(Productos.add).toBeCalledWith(productoNuevo);
  });
  it('debe tener una funcion eliminaProducto', () => {
    expect(typeof productoControllers.eliminaProducto).toBe('function');
  });
  it('eliminaProducto debe llamar al metodo delete del producto', async () => {
    Productos.add = jest.fn();
    Productos.delete = jest.fn();
    req.params.id = productoExistente._id;
    req.body = productoNuevo;
    await productoControllers.agregaProducto(req, res, next);
    await productoControllers.eliminaProducto(req, res, next);
    expect(Productos.delete).toBeCalledWith(productoExistente._id);
  });
  //   it('debe tener una funcion update', () => {});
  //   it('debe tener una funcion delete', () => {});
});
