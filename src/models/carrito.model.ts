import mongoose from 'mongoose';
import { ProductoI } from '../interfaces/productos.interfaces';
import { CarritoI, CarritoBaseClass } from '../interfaces/carrito.interface';
import { ProductoSchema, Productos } from '../models/productos.model';

mongoose.connect(`${process.env.MONGO_LOCAL_URI}`);

const CarritoSchema = new mongoose.Schema<CarritoI>(
  {
    producto: Array,
  },
  { timestamps: { createdAt: 'timestamp' } }
);

export class Carrito implements CarritoBaseClass {
  private carrito;
  constructor() {
    this.carrito = mongoose.model<CarritoI>('carrito', CarritoSchema);
  }

  async find(id: string) {
    const query = await this.carrito.findById(id).exec();
    if (query === null) {
      return undefined;
    }
    // console.log(query);
    return query;
  }

  async get(id?: string): Promise<CarritoI[]> {
    let salida: CarritoI[] = [];
    try {
      if (id) {
        const documento = await this.carrito.findById(id);
        if (documento) {
          salida.push(documento);
        }
      } else {
        salida = await this.carrito.find();
      }

      return salida;
    } catch (err) {
      return salida;
    }
  }

  async add(productoID: string): Promise<any> {
    const productoAIncluir = await Productos.get(productoID);
    const nuevoCarrito = new this.carrito({ producto: productoAIncluir });
    nuevoCarrito.save();
    return productoAIncluir;
  }

  async delete(id: string): Promise<void> {
    await this.carrito.findByIdAndDelete(id);
  }
}

export default new Carrito();
