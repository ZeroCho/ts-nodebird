import * as passport from 'passport';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import User from '../models/user';

export default () => {
  passport.use('local', new Strategy({
    usernameField: 'userId',
    passwordField: 'password',
  }, async (userId, password, done) => {
    try {
      const user = await User.findOne({ where: { userId } });
      if (!user) {
        return done(null, false, { message: '존재하지 않는 사용자입니다!' });
      }
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return done(null, user);
      }
      return done(null, false, { message: '비밀번호가 틀립니다.' });
    } catch (err) {
      console.error(err);
      return done(err);
    }
  }))
};
