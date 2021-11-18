import passport from 'passport';
import { Strategy } from 'passport-local';
import Usuarios from '../models/usuario.model';

passport.serializeUser((user: any, done) => done(null, user));

passport.deserializeUser((user: any, done) => done(null, user));
// const loginFunc = (req, done) => {
//   const email = req.body.email;
//   const password = req.body.password;
// };

// const signupFunc = () => {};

passport.use(
  'local',
  new Strategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      const usuario = await Usuarios.get(email);
      const validado = await Usuarios.validatePassword(email, password);
      if (validado) {
        done(null, usuario);
      } else {
        done(null, false);
      }
    }
  )
);

export default passport;
