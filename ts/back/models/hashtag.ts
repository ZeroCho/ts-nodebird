import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';

class Hashtag extends Model {
  public id!: number;

  public name!: string;
}

Hashtag.init({
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Hashtag',
  tableName: 'hashtag',
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
});

export const associate = (db: dbType) => {
  db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
};
export default Hashtag;
