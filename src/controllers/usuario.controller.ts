import Usuarios from '../models/usuario.model';
import { Request, Response, NextFunction } from 'express';

class controlUsuarios {
  async doLogin(req: Request, res: Response) {
    const body = req.body;
    const user = await Usuarios.usuarios.findOne({ email: body.email });
    console.log(user);
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await Usuarios.validatePassword(
        body.email,
        body.password
      );
      if (validPassword) {
        res.status(200).json({ message: 'Valid password' });
      } else {
        res.status(400).json({ error: 'Invalid Password' });
      }
    } else {
      res.status(401).json({ error: 'User does not exist' });
    }
  }

  async checkSignup(req: Request, res: Response, next: NextFunction) {
    const usuario = await Usuarios.get(req.body.email);
    if (usuario) {
      return res.status(422).json({ msg: `El email ya está registrado` });
    } else {
      next();
    }
  }

  async add(req: Request, res: Response) {
    await Usuarios.add(req.body);
    res.json({ msg: `Usuario agregado` });
  }
}

export default new controlUsuarios();

// const checkSignup = (req: Request, res: Response, next: NextFunction) => {
//   usuarios.exists(req.body, (salida) => {
//     if (salida) {
//       return res.status(422).json({ msg: `El email ya está registrado` });
//     } else {
//         next()
//     }
//   });
// };
