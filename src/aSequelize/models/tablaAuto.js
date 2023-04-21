import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database'
//Importamos tablas dependientes de Auto
import {tablaPlaca} from './tablaPlaca'

export const tablaAuto = sequelize.define('Auto',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    nom_auto:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ano:{
        type: DataTypes.INTEGER,
        allowNull: false

    },
    cilindraje:{
        type: DataTypes.FLOAT(2,1),
        allowNull: false

    },
    consumo_motor:{
        type: DataTypes.FLOAT,
        allowNull: false

    },
    consumo_caja:{
        type: DataTypes.FLOAT,
        allowNull: false

    },
    combustible:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    //habilita la creacion createAt updateAt
    timestamps: true
})


tablaAuto.hasMany(tablaPlaca,{
    foreignKey: 'id_auto',
    sourceKey: 'id'
})

tablaPlaca.belongsTo(tablaAuto,{
    foreignKey: 'id_auto',
    targetId: 'id'
})