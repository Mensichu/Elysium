import {DataTypes} from 'sequelize'
import {sequelize} from '../../database/database';

export const tablaTipoDeIdentificacion = sequelize.define('TipoDeIdentificacion',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    tipo:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    codigo:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    //habilita la creacion createAt updateAt
    timestamps: false
})