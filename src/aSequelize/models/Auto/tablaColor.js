import {DataTypes} from 'sequelize'
import {sequelize} from '../../database/database'
//Importamos tablas dependientes de Marca

export const tablaColor = sequelize.define('Color',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    nom_color:{
        type: DataTypes.STRING(50),
        allowNull: false

    },
    hex_color:{
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

