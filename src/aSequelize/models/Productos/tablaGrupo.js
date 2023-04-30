import {DataTypes} from 'sequelize'
import {sequelize} from '../../database/database'
//Importamos tablas dependientes de Auto
import {tablaSubgrupo} from './tablaSubgrupo'

export const tablaGrupo = sequelize.define('Grupo',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    nom_grupo:{
        type: DataTypes.STRING(50),
        allowNull: false
    }
},{
    //habilita la creacion createAt updateAt
    timestamps: true,
    // deshabilita la pluralización automática del nombre de la tabla
    freezeTableName: true
})



tablaGrupo.hasMany(tablaSubgrupo,{
    foreignKey: 'id_grupo',
    sourceKey: 'id'
})

tablaSubgrupo.belongsTo(tablaGrupo,{
    foreignKey: 'id_grupo',
    targetKey: 'id'
})