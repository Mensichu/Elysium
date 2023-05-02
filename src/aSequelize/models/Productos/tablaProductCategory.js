import {DataTypes} from 'sequelize'
import {sequelize} from '../../database/database'
import {tablaProducto} from '../Productos/tablaProducto'

export const tablaProductCategory = sequelize.define('ProductCategory', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  parentCategoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'ProductCategory',
      key: 'id'
    }
  }
},{
    //habilita la creacion createAt updateAt
    timestamps: true,
    // deshabilita la pluralización automática del nombre de la tabla
    freezeTableName: true
});

tablaProductCategory.belongsTo(tablaProductCategory, {
  as: 'parentCategory',
  foreignKey: 'parentCategoryId'
});

tablaProductCategory.hasMany(tablaProductCategory, {
  as: 'subcategories',
  foreignKey: 'parentCategoryId'
});


tablaProductCategory.hasMany(tablaProducto, { foreignKey: 'id_subgrupo' });
tablaProducto.belongsTo(tablaProductCategory, { foreignKey: 'id_subgrupo' });