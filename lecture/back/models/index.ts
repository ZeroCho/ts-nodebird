import User, { associate as associateUser } from './user';
export * from './sequelize';
const db = {
  User,
};
export type dbType = typeof db;

associateUser(db);
