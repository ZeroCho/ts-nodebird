import {
  Association,
  BelongsToManyAddAssociationMixin, BelongsToManyRemoveAssociationMixin,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  Model,
} from 'sequelize';
import Comment from './comment';
import Hashtag from './hashtag';
import Image from './image';
import { sequelize } from './sequelize';
import { dbType } from './index';
import User from './user';

class Post extends Model {
  public id!: number;

  public content!: string;

  public UserId!: number;

  public RetweetId!: number | null;

  public readonly createdAt!: Date;

  public addHashtags!: HasManyAddAssociationsMixin<Hashtag, number>

  public addImages!: HasManyAddAssociationsMixin<Image, number>

  public addImage!: HasManyAddAssociationMixin<Image, number>;

  public addComment!: HasManyAddAssociationMixin<Comment, number>;

  public addLiker!: BelongsToManyAddAssociationMixin<User, number>;

  public removeLiker!: BelongsToManyRemoveAssociationMixin<User, number>;

  public readonly Retweet?: Post;

  public readonly User?: User;

  public readonly Likers?: User[];

  public readonly Images?: Image[];

  public readonly Comments?: Comment[];

  public static associations: {
    Retweet: Association<Post, Post>,
  }
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
