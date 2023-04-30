import {DataTypes} from 'sequelize'
import {sequelize} from '../../database/database'
//Importamos tablas dependientes de Auto
//import {tablaProducto} from '../tablaProducto'

export const tablaSubgrupo = sequelize.define('Subgrupo',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    nom_subgrupo:{
        type: DataTypes.STRING(50),
        allowNull: false
    }
},{
    //habilita la creacion createAt updateAt
    timestamps: true,
    // deshabilita la pluralización automática del nombre de la tabla
    freezeTableName: true
})




/*
tablaGrupo.hasMany(tablaProducto,{
    foreignKey: 'id_grupo',
    sourceKey: 'id'
})

tablaProducto.belongsTo(tablaGrupo,{
    foreignKey: 'id_grupo',
    targetId: 'id'
})

*/