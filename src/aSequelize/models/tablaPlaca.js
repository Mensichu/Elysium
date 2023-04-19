import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database'


export const tablaPlaca = sequelize.define('Placa',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    placa:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    color:{
        type: DataTypes.STRING(10),
        allowNull: false

    },
    clave:{
        type: DataTypes.STRING(10),
        allowNull: false

    },
    obs_placa:{
        type: DataTypes.STRING(50),
        allowNull: false

    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    //habilita la creacion createAt updateAt
    timestamps: true
})