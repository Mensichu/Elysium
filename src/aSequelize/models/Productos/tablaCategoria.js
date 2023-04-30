import {DataTypes} from 'sequelize'
import {sequelize} from '../../database/database'
//Importamos tablas dependientes de Marca
import {tablaGrupo} from './tablaGrupo'

export const tablaCategoria = sequelize.define('Categoria',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    nom_categoria:{
        type: DataTypes.STRING(50),
        allowNull: false

    },
    tipo:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    }
},{
    //habilita la creacion createAt updateAt
    timestamps: true,
    // deshabilita la pluralización automática del nombre de la tabla
    freezeTableName: true
})


tablaCategoria.hasMany(tablaGrupo,{
    foreignKey: 'id_categoria',
    sourceKey: 'id'
})

tablaGrupo.belongsTo(tablaCategoria,{
    foreignKey: 'id_categoria',
    targetKey: 'id'
})