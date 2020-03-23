import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';

class Post extends Model {
  public id!: number;

  public content!: string;
}

Post.init({
  content: {
    type: DataTypes.TEXT, // 매우 긴 글
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Post',
  tableName: 'post',
  charset: 'utf8mb4', //  한글+이모티콘
  collate: 'utf8mb4_general_ci',
});

export const associate = (db: dbType) => {
  db.Post.belongsTo(db.User); // 테이블에 UserId 컬럼이 생겨요
  db.Post.hasMany(db.Comment);
  db.Post.hasMany(db.Image);
  db.Post.belongsTo(db.Post, { as: 'Retweet' }); // RetweetId 컬럼 생겨요
  db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
};

export default Post;
