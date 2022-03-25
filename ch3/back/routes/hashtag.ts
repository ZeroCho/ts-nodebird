import express from 'express';
import { Request } from 'express';
import Sequelize from 'sequelize';

import Hashtag from '../models/hashtag';
import Image from '../models/image';
import Post from '../models/post';
import User from '../models/user';

const router = express.Router();

router.get<any, any, any, { lastId: string, limit: string }>('/:tag', async (req: Request<any, any, any, { lastId: string, limit: string }>, res, next) => {
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [Sequelize.Op.lt]: parseInt(req.query.lastId, 10),
        },
      };
    }
    const posts = await Post.findAll({
      where,
      include: [{
        model: Hashtag,
        where: { name: decodeURIComponent(req.params.tag) },
      }, {
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
        }]
      }],
      order: [['createdAt', 'DESC']],
      limit: parseInt(req.query.limit, 10),
    })
    res.json(posts);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

export default router;
