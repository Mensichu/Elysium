import {DataTypes} from 'sequelize'
import {sequelize} from '../../database/database'
//Importamos tablas dependientes de Marca
import {tablaAuto} from './tablaAuto'

export const tablaMarca = sequelize.define('Marca',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    nom_marca:{
        type: DataTypes.STRING(50),
        allowNull: false

    },
    alias:{
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


tablaMarca.hasMany(tablaAuto,{
    foreignKey: 'id_marca',
    sourceKey: 'id'
})

tablaAuto.belongsTo(tablaMarca,{
    foreignKey: 'id_marca',
    targetId: 'id'
})