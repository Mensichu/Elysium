import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database';
import { tablaProducto } from '../Productos/tablaProducto';
import { tablaAuto } from '../Auto/tablaAuto';

export const tablaRegistroProductoAuto = sequelize.define('RegistroProductoAuto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: tablaProducto,
      key: 'id'
    }
  },
  id_auto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: tablaAuto,
      key: 'id'
    }
  }
  
}, {
  timestamps: true,
  // deshabilita la pluralización automática del nombre de la tabla
  freezeTableName: true
});

// Relaciones entre los modelos
tablaProducto.hasMany(tablaRegistroProductoAuto, { foreignKey: 'id_producto', as: 'registros' });
tablaAuto.hasMany(tablaRegistroProductoAuto, { foreignKey: 'id_auto', as: 'registros' });
tablaRegistroProductoAuto.belongsTo(tablaProducto, { foreignKey: 'id_producto', as: 'producto' });
tablaRegistroProductoAuto.belongsTo(tablaAuto, { foreignKey: 'id_auto', as: 'auto' });
