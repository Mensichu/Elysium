import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { tablaCliente } from './tablaCliente';
import { tablaPlaca } from './tablaPlaca';

export const tablaRegistroPlacaCliente = sequelize.define('RegistroPlacaCliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: tablaCliente,
      key: 'id'
    }
  },
  id_placa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: tablaPlaca,
      key: 'id'
    }
  }
  
}, {
  timestamps: true
});

// Relaciones entre los modelos
tablaCliente.hasMany(tablaRegistroPlacaCliente, { foreignKey: 'id_cliente', as: 'registros' });
tablaPlaca.hasMany(tablaRegistroPlacaCliente, { foreignKey: 'id_placa', as: 'registros' });
tablaRegistroPlacaCliente.belongsTo(tablaCliente, { foreignKey: 'id_cliente', as: 'cliente' });
tablaRegistroPlacaCliente.belongsTo(tablaPlaca, { foreignKey: 'id_placa', as: 'placa' });