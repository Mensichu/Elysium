
import { tablaCliente } from '../models/tablaCliente';
import {tablaTipoDeIdentificacion} from '../models/Sri/tablaTipoDeIdentificacion'


export const createClient = async (req,res) =>{
    try{
        const {identificacion,tipo,nombres,apellidos_empresa,sexo,
                telefono1,telefono2,telefono3,
                direccion,correo,obs_cliente} = req.body;

        const cliente = await tablaCliente.create(
            {
                identificacion,tipo,nombres,apellidos_empresa,sexo,
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
            //Al ser los mismos nombres de parametros se usa auto = req.body
            //si solo paso los campos que quiero actualizar el solo actualizo esos campos
            //auto.set(req.body) No deseo actualizar modelo y marca
            client.set(req.body);

            await client.save();
            
            res.json(client);
            
        }else{
            res.status(404).json({message: 'placa not found'});
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
            res.json(client);
        }else{
            res.status(404).json({message: 'client not found'});
        }
    }catch(error){
        return res.status(500).json({message:error.message});
    }
    
}


export const getTablaClients = async (req,res) =>{
    try{
        const clients = await tablaCliente.findAll({
            where:{estado:true},
            attributes:['id','apellidos_empresa','nombres','identificacion'],
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