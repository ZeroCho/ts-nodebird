import * as passport from 'passport';
import User from '../models/user';
import local from './local';

export default () => {
  passport.serializeUser<User, number>((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser<User, number>(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id },
      });
      if (!user) {
        return done(new Error('no user'));
      }
      return done(null, user); // req.user
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });

  local();
}
