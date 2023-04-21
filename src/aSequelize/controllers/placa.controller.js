import {tablaMarca} from '../models/tablaMarca';
import {tablaAuto} from '../models/tablaAuto';
import { tablaPlaca } from '../models/tablaPlaca';




export const getPlacaById = async (req,res)=>{
    const {id} = req.params;
    try{
        const placa = await tablaPlaca.findOne({
            where:{id},
            attributes:{
                exclude:['estado','createdAt','updatedAt']
            },
            include:{
                model:tablaAuto,
                attributes:['id_marca'],
            }
        })
        if (placa!==null){
            res.json(placa);
        }else{
            res.status(404).json({message: 'placa not found'});
        }
    }catch(error){
        return res.status(500).json({message:error.message});
    }
    
}




export const getPlacas = async (req,res) =>{
    try{
        const marcas = await tablaMarca.findAll();
        res.json(marcas);
    }catch(error){
        return res.status(500).json({ message: error.message });
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
            
            attributes:['id','nom_auto','ano','cilindraje'],
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
                attributes: ['nom_auto','ano','cilindraje'],
                include:{
                    model: tablaMarca,
                    attributes: ['nom_marca']
                }
            },
            
            order:[['nom_placa','ASC'],[tablaAuto,'nom_auto','ASC']]
        });
        res.json(placas);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
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
                attributes: ['nom_marca']
            }
            }
        ]
    });
    return placaConAutoYMarca;
}


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