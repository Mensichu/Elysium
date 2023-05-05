import {DataTypes} from 'sequelize'
import {sequelize} from '../../database/database'
import {tablaProveedor} from '../Pedidos/tablaProveedor'

export const tablaProducto = sequelize.define('Producto', {
  
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  marca:{
    type: DataTypes.STRING(30),
    allowNull: true
  },
  nom_producto:{
    type: DataTypes.STRING(200),
    allowNull: false
  },
  nom_impresion:{
    type: DataTypes.STRING(200),
    allowNull: false
  },
  costosiniva:{
    type: DataTypes.FLOAT,
    allowNull: false

  },
  costoconiva:{
    type: DataTypes.FLOAT,
    allowNull: false

  },
  iva:{
    type: DataTypes.FLOAT,
    allowNull: false

  },
  porcentaje1:{
    type: DataTypes.FLOAT,
    allowNull: false

  },
  porcentaje2:{
    type: DataTypes.FLOAT,
    allowNull: false

  },
  porcentaje3:{
    type: DataTypes.FLOAT,
    allowNull: false

  },
  pvp1:{
    type: DataTypes.FLOAT,
    allowNull: false

  },
  pvp2:{
    type: DataTypes.FLOAT,
    allowNull: false

  },
  pvp3:{
    type: DataTypes.FLOAT,
    allowNull: false

  },
  cantidad:{
    type: DataTypes.FLOAT,
    allowNull: false

  },
  minimo:{
    type: DataTypes.FLOAT,
    allowNull: false

  },
  cod1:{
    type: DataTypes.STRING(30),
    allowNull: true
  },
  cod2:{
    type: DataTypes.STRING(30),
    allowNull: true
  },
  cod3:{
    type: DataTypes.STRING(30),
    allowNull: true
  },
  obs_producto:{
    type: DataTypes.STRING(200),
    allowNull: true
  },
  estado:{
    type: DataTypes.BOOLEAN,
    defaultValue:true
  }
},{
    //habilita la creacion createAt updateAt
    timestamps: true,
    // deshabilita la pluralización automática del nombre de la tabla
    freezeTableName: true
});

