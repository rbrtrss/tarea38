import { Router } from 'express';
import controlUsuarios from '../controllers/usuario.controller';
import {
  validateLogin,
  validateSignup,
} from '../validations/usuarios.validations';
import passport from '../services/passport';
import { UsuarioI } from '../interfaces/usuario.interfaces';
import notificationMail from '../services/mail';

const usuariosRouter = Router();

usuariosRouter.post(
  '/login',
  validateLogin,
  passport.authenticate('local'),
  (req, res) => {
    const usuario = req.user as UsuarioI;
    res.json({ msg: `Bienvenido ${usuario.nombre} ${usuario.apellido}` });
  }
);

usuariosRouter.post(
  '/signup',
  validateSignup,
  controlUsuarios.add,
  async function (req, res) {
    await notificationMail('admin@myapp.com');
    res.json({ ...req.body });
  }
);
// usuariosRouter.get('/login', validateLogin, controlUsuarios.doLogin);
// usuariosRouter.get('/login', validateLogin, async function (req, res) {
//   const body = req.body;
//   const user = await Usuarios.usuarios.findOne({ email: body.email });
//   if (user) {
//     // check user password with hashed password stored in the database
//     const validPassword = await Usuarios.validatePassword(
//       body.password,
//       user.password
//     );
//     if (validPassword) {
//       res.status(200).json({ message: 'Valid password' });
//     } else {
//       res.status(400).json({ error: 'Invalid Password' });
//     }
//   } else {
//     res.status(401).json({ error: 'User does not exist' });
//   }
// });

// usuariosRouter.get('/existe', async (req, res) => {
//   const existe = await Usuarios.get(req.body.email);
//   if (existe) {
//     res.json({ msg: `El email ya está registrado` });
//   } else {
//     res.json({ msg: `Todo bien move along` });
//   }
// });

// usuariosRouter.get('/otras', (req, res) => {
//   res.json({ msg: `Que lindo` });
// });

export default usuariosRouter;
