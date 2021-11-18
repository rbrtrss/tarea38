import express from 'express';
import session from 'express-session';
import usuariosRouter from '../routes/usuario.routes';
import productosRouter from '../routes/productos.routes';
import carritoRouter from '../routes/carrito.routes';
import passport from '../services/passport';
import { graphqlHTTP } from 'express-graphql';
import { graphQLMainSchema } from './graphql';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 6000 } }));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQLMainSchema,
    graphiql: true,
  })
);

app.use('/', usuariosRouter);
app.use('/productos', productosRouter);
app.use('/carrito', carritoRouter);

export default app;
