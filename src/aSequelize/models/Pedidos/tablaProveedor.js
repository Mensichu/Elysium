import {DataTypes} from 'sequelize'
import {sequelize} from '../../database/database';
import {tablaTipoDeIdentificacion} from '../../models/Sri/tablaTipoDeIdentificacion';

export const tablaProveedor = sequelize.define('Proveedor',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    tipo:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    identificacion:{
        type: DataTypes.STRING(20),
        allowNull: true
    },
    nom_proveedor:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    representante:{
        type: DataTypes.STRING(200),
        allowNull: true
    },
    cuenta1_nombre:{
        type: DataTypes.STRING(30),
        allowNull: true
    },
    cuenta1_numero:{
        type: DataTypes.STRING(30),
        allowNull: true
    },
    cuenta2_nombre:{
        type: DataTypes.STRING(30),
        allowNull: true
    },
    cuenta2_numero:{
        type: DataTypes.STRING(30),
        allowNull: true
    },
    telefono1:{
        type: DataTypes.STRING(30),
        allowNull: true
    },
    telefono2:{
        type: DataTypes.STRING(30),
        allowNull: true
    },
    telefono3:{
        type: DataTypes.STRING(30),
        allowNull: true
    },
    direccion:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    correo:{
        type: DataTypes.STRING(100),
        allowNull: true
    },
    obs_proveedor:{
        type: DataTypes.STRING(200),
        allowNull: true
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
});

// Establecer la relación
tablaProveedor.belongsTo(tablaTipoDeIdentificacion, { foreignKey: 'tipo', targetKey: 'id' });
tablaTipoDeIdentificacion.hasMany(tablaProveedor, { foreignKey: 'tipo', sourceKey: 'id' });