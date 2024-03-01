
import { tablaCliente } from '../models/tablaCliente';
import { tablaAuto } from '../models/Auto/tablaAuto';
import { tablaMarca } from '../models/Auto/tablaMarca';
import {tablaTipoDeIdentificacion} from '../models/Sri/tablaTipoDeIdentificacion'


export const createClient = async (req,res) =>{
    try{
        const {identificacion,tipo,nombres,apellidos_empresa,genero,
                telefono1,telefono2,telefono3,
                direccion,correo,obs_cliente} = req.body;

        const cliente = await tablaCliente.create(
            {
                identificacion,tipo,nombres,apellidos_empresa,genero,
                telefono1,telefono2,telefono3,
                direccion,correo,obs_cliente
            }
        );

        res.json(cliente);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    } 
    
}

export const updateClient = async (req,res)=>{
    const {id} = req.params;
    
    try{
        const client = await tablaCliente.findByPk(id);
        if(client!==null){

            client.set(req.body);

            await client.save();
            
            res.json(client);
            
        }else{
            res.status(404).json({message: 'client not found'});
        }
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}


export const getClient = async (req,res)=>{
    const {id} = req.params;
    try{
        const client = await tablaCliente.findOne({
            where:{id},
            attributes:{
                exclude:['estado','createdAt','updatedAt']
            },
            include:[
                {
                    model:tablaTipoDeIdentificacion,
                    attributes:['tipo']
                }
        ]
        });
        if (client!==null){
            //res.json(client);
            // Obtener los registros del cliente
            const registros = await client.getRegistros();
            // Mapear los registros para obtener la información de la placa
            const placas = await Promise.all(registros.map(async registro => {
                const placa = await registro.getPlaca();
                return placa.toJSON();
            }));
            // Agregar la información de la placa al objeto del cliente
            const clienteConPlacas = client.toJSON();
            clienteConPlacas.placas = placas;
            res.json(clienteConPlacas);
        }else{
            res.status(404).json({message: 'client not found'});
        }
    }catch(error){
        return res.status(500).json({message:error.message});
    }
    
}


export const getClientByData = async (req,res)=>{
    const {id} = req.params;
    try{
        const client = await tablaCliente.findOne({
            where:{identificacion:id},
            attributes:{
                exclude:['estado','createdAt','updatedAt']
            },
            include:[
                {
                    model:tablaTipoDeIdentificacion,
                    attributes:['tipo']
                }
        ]
        });
        if (client!==null){
            //res.json(client);
            // Obtener los registros del cliente
            const registros = await client.getRegistros();
            //console.log("ESTOS SON LOS REGISTROS DEL CLIENTE");
            //console.log(registros[0].dataValues.id)
            // Mapear los registros para obtener la información de la placa
            const placas = await Promise.all(registros.map(async registro => {
                console.log("REGISTRO")
                console.log(registro.dataValues.id)
                const placa = await registro.getPlaca({
                    include:
                        {
                            //id_relacion: registro.dataValues.id,
                            model: tablaAuto,
                            attributes: ['nom_auto', 'ano', 'cilindraje'],
                            include: {
                                model: tablaMarca,
                                attributes: ['nom_marca','alias']
                            }
                        }
                });
                const placaConIdRelacion = {
                    ...placa.toJSON(),
                    id_relacion: registro.dataValues.id
                };
                return placaConIdRelacion;
            }));
            // Agregar la información de la placa al objeto del cliente
            const clienteConPlacas = client.toJSON();
            clienteConPlacas.placas = placas;
            res.json(clienteConPlacas);
        }else{
            res.status(404).json({message: 'client not found'});
        }
    }catch(error){
        return res.status(500).json({message:error.message});
    }
    
}



//Filtros

import Sequelize from 'sequelize';

export const getTablaClients = async (req,res) =>{
    try{
        
        let {page,size,search1,search2}= req.query;
        
        page=page!==undefined?page:'';
        size=size!==undefined?size:'';
        search1=search1!==undefined?search1:'';
        search2=search2!==undefined?search2:'';
        size = size!=-1 ? size : '';//Envia todos los registros si es -1
        const searchString1 = search1 ? search1.toUpperCase() : '';
        const searchString2 = search2 ? search2.toUpperCase() : '';

        console.log('valores: '+page+' '+size+' '+search1+' '+search2)

        const clients = await tablaCliente.findAndCountAll({
            limit: parseInt(size),
            offset: parseInt(page)*parseInt(size),
            where:
                {
                    estado:true,
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('upper', Sequelize.col('identificacion')), 'LIKE', `%${searchString1}%`)
                    ],
                    [Op.or]: [
                        Sequelize.where(Sequelize.fn('upper', Sequelize.col('apellidos_empresa')), 'LIKE', `%${searchString2}%`),
                        Sequelize.where(Sequelize.fn('upper', Sequelize.col('nombres')), 'LIKE', `%${searchString2}%`)
                    ],
                },
            attributes:['id','apellidos_empresa','nombres','identificacion','genero'],
            include:[
                {
                    model: tablaTipoDeIdentificacion,
                    attributes: ['tipo'],
                }
            ],
            
            order:[['apellidos_empresa','ASC'],['nombres','ASC']]
        });
        res.json(clients);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    }
}



export const getComboTipos = async (req,res) =>{
    try{
        const tipos = await tablaTipoDeIdentificacion.findAll({
            attributes:['id','tipo','codigo'],
            order:[['id','ASC']]
        });
        res.json(tipos);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    }
}



const { Op } = require("sequelize");

export const getClientsRepetidos = async (req, res)=>{
    const {id, identificacion} = req.query;
    console.log(id)
    console.log(identificacion)
    try{
        const identificacionEncontrada = await tablaCliente.findAll({
            where:{
                identificacion: {
                    [Op.eq]: identificacion,
                    [Op.not]: "0000000000"
                },
                id: {
                    [Op.not]: id
                  }
            }
        });
        if(identificacionEncontrada!==null && identificacionEncontrada.length>0){
            res.json( {respuesta:true} );//True significa que encontro
        }else{
            res.json( {respuesta:false} );
        }
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}