import express from 'express';
import { Request } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';

import { isLoggedIn, isNotLoggedIn } from './middleware';
import User from '../models/user';
import Post from '../models/post';
import Image from '../models/image';

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
    const user = req.user!.toJSON() as User;
    return res.json({ ...user, password: null });
});

router.post('/', async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                userId: req.body.userId,
            },
        });
        if (exUser) {
            return res.status(403).send('이미 사용 중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
        });
        return res.status(200).json(newUser);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err: Error, user: User, info: { message: string }) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.message);
        }
        return req.login(user, async (loginErr: Error) => {
            try {
                if (loginErr) {
                    return next(loginErr);
                }
                const fullUser = await User.findOne({
                    where: { id: user.id },
                    include: [{
                        model: Post,
                        as: 'Posts',
                        attributes: ['id'],
                    }, {
                        model: User,
                        as: 'Followings',
                        attributes: ['id'],
                    }, {
                        model: User,
                        as: 'Followers',
                        attributes: ['id'],
                    }],
                    attributes: {
                        exclude: ['password'],
                    },
                });
                return res.json(fullUser);
            } catch (e) {
                console.error(e);
                return next(e);
            }
        });
    })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session!.destroy(() => {
        res.send('logout 성공');
    });
});

interface IUser extends User {
    PostCount: number;
    FollowingCount: number;
    FollowerCount: number;
}
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: parseInt(req.params.id, 10) },
            include: [{
                model: Post,
                as: 'Posts',
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followers',
                attributes: ['id'],
            }],
            attributes: ['id', 'nickname'],
        });
        if (!user) {
            return res.status(404).send('no user');
        }
        const jsonUser = user.toJSON() as IUser;
        jsonUser.PostCount = jsonUser.Posts ? jsonUser.Posts.length : 0;
        jsonUser.FollowingCount = jsonUser.Followings ? jsonUser.Followings.length : 0;
        jsonUser.FollowerCount = jsonUser.Followers ? jsonUser.Followers.length : 0;
        return res.json(jsonUser);
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.get<any, any, any, { limit: string, offset: string }>('/:id/followings', isLoggedIn, async (req: Request<any, any, any, { limit: string, offset: string }>, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0 },
        });
        if (!user) return res.status(404).send('no user');
        const followings = await user.getFollowings({
            attributes: ['id', 'nickname'],
            limit: parseInt(req.query.limit, 10),
            offset: parseInt(req.query.offset, 10),
        })
        return res.json(followings);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get<any, any, any, { limit: string, offset: string }>('/:id/followers', isLoggedIn, async (req: Request<any, any, any, { limit: string, offset: string }>, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0 },
        });
        if (!user) return res.status(404).send('no user');
        const followers = await user.getFollowers({
            attributes: ['id', 'nickname'],
            limit: parseInt(req.query.limit, 10),
            offset: parseInt(req.query.offset, 10),
        })
        return res.json(followers);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.delete('/:id/follower', isLoggedIn, async (req, res, next) => {
    try {
        const me = await User.findOne({
            where: { id: req.user!.id },
        });
        await me!.removeFollower(parseInt(req.params.id, 10));
        res.send(req.params.id);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    try {
        const me = await User.findOne({
            where: { id: req.user!.id },
        });
        await me!.addFollowing(parseInt(req.params.id, 10));
        res.send(req.params.id);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/:id/follow', isLoggedIn, async (req, res, next) => {
    try {
        const me = await User.findOne({
            where: { id: req.user!.id },
        });
        await me!.removeFollowing(parseInt(req.params.id, 10));
        res.send(req.params.id);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('/:id/posts', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
          where: {
            UserId: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0,
            RetweetId: null,
          },
          include: [{
            model: User,
            attributes: ['id', 'nickname'],
          }, {
            model: Image,
          }, {
            model: User,
            as: 'Likers',
            attributes: ['id'],
          }],
        });
        res.json(posts);
      } catch (e) {
        console.error(e);
        next(e);
      }
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
      await User.update({
        nickname: req.body.nickname,
      }, {
        where: { id: req.user!.id },
      });
      res.send(req.body.nickname);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

  export default router;
