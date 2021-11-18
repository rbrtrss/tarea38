import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import {
  ProductoI,
  NuevoProductoI,
  ProductoBaseClass,
} from '../interfaces/productos.interfaces';

mongoose.connect(`${process.env.MONGO_LOCAL_URI}`);

export const ProductoSchema = new mongoose.Schema<ProductoI>(
  {
    nombre: String,
    descripcion: String,
    codigo: String,
    foto: String,
    precio: Number,
    stock: Number,
  },
  { timestamps: { createdAt: 'timestamp' } }
);

const productoModel = mongoose.model<ProductoI>('productos', ProductoSchema);
export const ProductosTC = composeWithMongoose(productoModel);

export class Productos implements ProductoBaseClass {
  static get(productoID: string) {
    throw new Error('Method not implemented.');
  }
  private productos;

  constructor() {
    // this.productos = mongoose.model<ProductoI>('productos', ProductoSchema);
    this.productos = productoModel;
  }

  async find(id: string) {
    const query = await this.productos.findById(id).exec();
    if (query === null) {
      return undefined;
    }
    // console.log(query);
    return query;
  }

  async get(id?: string): Promise<ProductoI[]> {
    let salida: ProductoI[] = [];
    try {
      if (id) {
        const documento = await this.productos.findById(id);
        if (documento) {
          salida.push(documento);
        }
      } else {
        salida = await this.productos.find();
      }

      return salida;
    } catch (err) {
      return salida;
    }
  }

  async add(datos: NuevoProductoI): Promise<ProductoI> {
    const nuevoProducto = new this.productos(datos);
    await nuevoProducto.save();
    return nuevoProducto;
  }

  async update(id: string, nuevo: NuevoProductoI) {
    await this.productos.findByIdAndUpdate(id, nuevo);
  }

  async delete(id: string): Promise<void> {
    await this.productos.findByIdAndDelete(id);
  }
}

export default new Productos();
