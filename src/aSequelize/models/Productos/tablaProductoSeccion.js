import {DataTypes} from 'sequelize'
import {sequelize} from '../../database/database'
import {tablaProducto} from '../Productos/tablaProducto'

export const tablaProductoSeccion = sequelize.define('ProductoSeccion', {
  
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  cod_seccion:{
    type: DataTypes.STRING(30),
    allowNull: true
  },
  nom_seccion:{
    type: DataTypes.STRING(200),
    allowNull: false
  }
},{
    //habilita la creacion createAt updateAt
    timestamps: true,
    // deshabilita la pluralización automática del nombre de la tabla
    freezeTableName: true
});


tablaProductoSeccion.hasMany(tablaProducto, { foreignKey: 'id_seccion' });
tablaProducto.belongsTo(tablaProductoSeccion, { foreignKey: 'id_seccion' });