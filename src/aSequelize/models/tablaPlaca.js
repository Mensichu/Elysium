import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database'


export const tablaPlaca = sequelize.define('Placa',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    nom_placa:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    color1:{
        type: DataTypes.STRING(10),
        allowNull: false

    },
    color2:{
        type: DataTypes.STRING(10),
        allowNull: false

    },
    clave:{
        type: DataTypes.STRING(10),
        allowNull: false

    },
    obs_placa:{
        type: DataTypes.STRING(100),
        allowNull: true

    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    //habilita la creacion createAt updateAt
    timestamps: true
})