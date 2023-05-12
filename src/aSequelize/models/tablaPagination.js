import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database'

export const tablaPagination = sequelize.define('Pagination',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    num_pagination:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    default:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
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
})