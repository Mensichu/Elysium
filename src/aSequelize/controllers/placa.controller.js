import {tablaMarca} from '../models/Auto/tablaMarca';
import {tablaAuto} from '../models/Auto/tablaAuto';
import { tablaColor } from '../models/Auto/tablaColor';
import { tablaPlaca } from '../models/tablaPlaca';
// Si se esta usando internamente, no remover
import { tablaPlacaColores } from '../models/Auto/tablaPlacaColores';



export const createPlaca = async (req,res) =>{
    try{
        const {nom_placa,color1,color2,clave,obs_placa,id_auto} = req.body;

        const placa = await tablaPlaca.create(
            {
            nom_placa,
            color1,
            color2,
            clave,
            obs_placa,
            id_auto
            },
        );
        if(color1===color2){
            placa.setColores([color1]);//Actualiza la relacion
        }else{
            placa.setColores([color1,color2]);//Actualiza la relacion
        }

        const datosfinales = await placaConAutoYMarca(placa.id);
        res.json(datosfinales);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    } 
    
}


export const updatePlaca = async (req,res)=>{
    const {id} = req.params;
    const {nom_placa,color1,color2,clave,obs_placa,id_auto} = req.body;
    try{
        const placa = await tablaPlaca.findByPk(id);
        if(placa!==null){
            //Al ser los mismos nombres de parametros se usa auto = req.body
            //si solo paso los campos que quiero actualizar el solo actualizo esos campos
            //auto.set(req.body) No deseo actualizar modelo y marca
            placa.nom_placa = nom_placa,
            placa.color1 =  color1,
            placa.color2 =  color2,
            placa.clave=    clave,
            placa.obs_placa=obs_placa,
            placa.id_auto=id_auto

            await placa.save();

            if(color1===color2){
                placa.setColores([color1]);//Actualiza la relacion
            }else{
                placa.setColores([color1,color2]);//Actualiza la relacion
            }

            const datosfinales = await placaConAutoYMarca(placa.id);
            res.json(datosfinales);

        }else{
            res.status(404).json({message: 'placa not found'});
        }
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }


}



async function placaConAutoYMarca (idPlaca){
    const placaId = idPlaca;
    const placaConAutoYMarca = await tablaPlaca.findOne({
        where: { id: placaId },
        include: [
            {
            model: tablaAuto,
            attributes: ['nom_auto', 'ano', 'cilindraje'],
            include: {
                model: tablaMarca,
                attributes: ['nom_marca','alias']
            }
            }
        ]
    });
    return placaConAutoYMarca;
}




export const getPlacaById = async (req,res)=>{
    const {id} = req.params;
    try{
        const placa = await tablaPlaca.findOne({
            where:{id},
            attributes:{
                exclude:['estado','createdAt','updatedAt']
            },
            include:[
                {
                    model:tablaAuto,
                    attributes:['id_marca']
                },
                {
                    model: tablaColor,
                    as: 'colores',
                    attributes: ['id','hex_color']
                }
        ]
        });
        if (placa!==null){
            //res.json(placa);
            // Obtener los registros de la placa
            const registros = await placa.getRegistros();
            // Mapear los registros para obtener la información de los clientes
            const clients = await Promise.all(registros.map(async registro => {
                const client = await registro.getCliente();
                return client.toJSON();
            }));
            // Agregar la información de la placa al objeto del cliente
            const placaConClientes = placa.toJSON();
            placaConClientes.clientes = clients;
            res.json(placaConClientes);
        }else{
            res.status(404).json({message: 'placa not found'});
        }
    }catch(error){
        return res.status(500).json({message:error.message});
    }
    
}


export const getComboAutosInfo = async (req,res) =>{
    const {id} = req.params
    try{
        const autos = await tablaAuto.findAll({
            where:{
                id_marca: id,
                estado:true
            },
            
            attributes:['id','nom_auto','ano','cilindraje','combustible'],
            order: [['nom_auto','ASC']]
        });
        res.json(autos);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    }
}



export const getTablaPlacas = async (req,res) =>{
    try{
        const placas = await tablaPlaca.findAll({
            where:{estado:true},
            attributes:['id','nom_placa'],
            include:{
                model: tablaAuto,
                attributes: ['nom_auto','ano','cilindraje','combustible'],
                include:{
                    model: tablaMarca,
                    attributes: ['alias'],
                    //No sirve el order
                    order: [['alias', 'ASC']] // Ordenar por la columna "alias" de tablaMarca
                }
            },
            
            //order:[['nom_placa','ASC'],[tablaAuto,'nom_auto','ASC']]
        });
        res.json(placas);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    }
}


const { Op } = require("sequelize");

export const getPlacasRepetidas = async (req, res)=>{
    const {id, nom_placa} = req.query;
    console.log(id)
    console.log(nom_placa)
    try{
        const placaEncontrada = await tablaPlaca.findAll({
            where:{
                nom_placa:nom_placa,
                id: {
                    [Op.not]: id
                  }
            }
        });
        if(placaEncontrada!==null && placaEncontrada.length>0){
            res.json( {respuesta:true} );
        }else{
            res.json( {respuesta:false} );
        }
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}