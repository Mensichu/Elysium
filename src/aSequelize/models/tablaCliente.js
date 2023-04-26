import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database'
import {tablaTipoDeIdentificacion} from '../models/Sri/tablaTipoDeIdentificacion'

export const tablaCliente = sequelize.define('Client',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    tipo:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    identificacion:{
        type: DataTypes.STRING(20),
        allowNull: true
    },
    apellidos_empresa:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    nombres:{
        type: DataTypes.STRING(200),
        allowNull: true
    },
    genero:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    telefono1:{
        type: DataTypes.STRING(30),
        allowNull: true
    },
    telefono2:{
        type: DataTypes.STRING(30),
        allowNull: true
    },
    telefono3:{
        type: DataTypes.STRING(30),
        allowNull: true
    },
    direccion:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    correo:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    obs_cliente:{
        type: DataTypes.STRING(200),
        allowNull: true
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    //habilita la creacion createAt updateAt
    timestamps: true
});

// Establecer la relación
tablaCliente.belongsTo(tablaTipoDeIdentificacion, { foreignKey: 'tipo', targetKey: 'id' });
tablaTipoDeIdentificacion.hasMany(tablaCliente, { foreignKey: 'tipo', sourceKey: 'id' });