import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database';
import { tablaProveedor } from '../Pedidos/tablaProveedor';
import { tablaProducto } from './tablaProducto';

export const tablaRegistroProveedorProducto = sequelize.define('RegistroProveedorProducto', {
  id_proveedor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  costosiniva: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
  
}, {
  timestamps: true,
  // deshabilita la pluralización automática del nombre de la tabla
  freezeTableName: true
});


// Definir la asociación muchos a muchos
tablaProveedor.belongsToMany(tablaProducto, { through: tablaRegistroProveedorProducto, foreignKey: 'id_proveedor' });
tablaProducto.belongsToMany(tablaProveedor, { through: tablaRegistroProveedorProducto, foreignKey: 'id_producto' });

/*
Correcto, eso debería definir correctamente la relación muchos a muchos entre tablaProveedor y tablaProducto a través 
de la tabla tablaRegistroProveedorProducto. Ahora puedes usar los métodos getProductos, setProductos, addProducto, 
removeProducto, countProductos, getProveedores, setProveedores, addProveedor, removeProveedor, countProveedores, que 
se generan automáticamente a través de la definición de esta relación para acceder y manipular los registros 
relacionados en la base de datos.
*/