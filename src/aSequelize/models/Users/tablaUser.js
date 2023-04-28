import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database';
import bcrypt from 'bcrypt';

export const tablaUser = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

tablaUser.beforeCreate(async (user) => {
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
});

tablaUser.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};