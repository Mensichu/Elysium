import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database'
//Importamos tablas dependientes de Marca
import {crearTablaAuto} from './tablaAuto'

export const crearTablaMarca = sequelize.define('Marca',{
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


crearTablaMarca.hasMany(crearTablaAuto,{
    foreignKey: 'id_marca',
    sourceKey: 'id'
})

crearTablaAuto.belongsTo(crearTablaMarca,{
    foreignKey: 'id_marca',
    targetId: 'id'
})