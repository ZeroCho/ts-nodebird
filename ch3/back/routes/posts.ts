import express from 'express';
import { Request } from 'express';
import Sequelize from 'sequelize';

import Image from '../models/image';
import Post from '../models/post';
import User from '../models/user';

const router = express.Router();

router.get<any, any, any, { lastId: string, limit: string }>('/', async (req: Request<any, any, any, { lastId: string, limit: string }>, res, next) => {
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [Sequelize.Op.lt]: parseInt(req.query.lastId, 10), // less than
        },
      };
    }
    const posts = await Post.findAll({
      where,
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: User,
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }],
      }],
      order: [['createdAt', 'DESC']], // DESC는 내림차순, ASC는 오름차순
      limit: parseInt(req.query.limit, 10),
    });
    return res.json(posts);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

export default router;
