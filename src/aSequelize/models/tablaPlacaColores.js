import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database'
//Importamos tablas dependientes de Marca
import {tablaPlaca} from './tablaPlaca'
import {tablaColor} from './tablaColor'

export const tablaPlacaColores = sequelize.define('Placa_Colores',{
    id_placa: {
        type: DataTypes.INTEGER,
        references: {
          model: tablaPlaca,
          key: 'id'
        }
      },
      id_color: {
        type: DataTypes.INTEGER,
        references: {
          model: tablaColor,
          key: 'id'
        }
      }
},{
    //habilita la creacion createAt updateAt
    timestamps: true
})



// Relaciones entre los modelos
tablaPlaca.belongsToMany(tablaColor, { through: tablaPlacaColores, foreignKey: 'id_placa', as: 'colores' });
tablaColor.belongsToMany(tablaPlaca, { through: tablaPlacaColores, foreignKey: 'id_color', as: 'placas' });