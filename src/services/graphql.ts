import { SchemaComposer } from 'graphql-compose';
import {
  ProductosQuery,
  ProductosMutation,
} from '../controllers/producto.graphql';
import { ProductosTC } from '../models/productos.model';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({ ...ProductosQuery });

schemaComposer.Mutation.addFields({ ...ProductosMutation });

export const graphQLMainSchema = schemaComposer.buildSchema();
