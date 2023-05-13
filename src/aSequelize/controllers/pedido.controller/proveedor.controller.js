import { tablaProveedor } from '../../models/Pedidos/tablaProveedor';
import { tablaProducto } from '../../models/Productos/tablaProducto';
import {tablaTipoDeIdentificacion} from '../../models/Sri/tablaTipoDeIdentificacion'

export const createProveedor = async (req,res) =>{
    try{
        
        const proveedorNew = await tablaProveedor.create(
            req.body
        );

        res.json(proveedorNew);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    } 
    
}

export const updateProveedor = async (req,res)=>{
    const {id} = req.params;
    
    try{
        const proveedor = await tablaProveedor.findByPk(id);
        if(proveedor!==null){

            proveedor.set(req.body);

            await proveedor.save();
            
            res.json(proveedor);
            
        }else{
            res.status(404).json({message: 'provedor not found'});
        }
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getProveedor = async (req,res)=>{
    const {id} = req.params;
    try{
        const proveedor = await tablaProveedor.findOne({
            where:{id},
            attributes:{
                exclude:['estado','createdAt','updatedAt']
            },
            include:[
                {
                    model:tablaTipoDeIdentificacion,
                    attributes:['tipo']
                },
                {
                    model: tablaProducto,
                    attributes:['marca','nom_producto','cantidad','minimo'],
                    through:{
                        attributes:['costosiniva']
                    }
                }
        ]
        });
        if (proveedor!==null){
            res.json(proveedor);
        }else{
            res.status(404).json({message: 'proveedor not found'});
        }
    }catch(error){
        return res.status(500).json({message:error.message});
    }
    
}


import Sequelize from 'sequelize';

export const getTablaProveedores = async (req,res) =>{
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

        const proveedores = await tablaProveedor.findAndCountAll({
            where:
                {
                    estado:true,
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('upper', Sequelize.col('nom_proveedor')), 'LIKE', `%${searchString1}%`),
                        Sequelize.where(Sequelize.fn('upper', Sequelize.col('identificacion')), 'LIKE', `%${searchString2}%`)
                    ],
                },
            attributes:['id','identificacion','nom_proveedor','representante'],
            include:[
                {
                    model: tablaTipoDeIdentificacion,
                    attributes: ['tipo'],
                }
            ],
            
            order:[['nom_proveedor','ASC']]
        });
        res.json(proveedores);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    }
}


export const getComboProveedor = async (req,res) =>{
    try{
        const proveedores = await tablaProveedor.findAll({
            where:{estado:true},
            attributes:['id','nom_proveedor'],
            
            
            order:[['nom_proveedor','ASC']]
        });
        res.json(proveedores);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    }
}


const { Op } = require("sequelize");

export const getProveedoresRepetidos = async (req, res)=>{
    const {id, identificacion,nom_proveedor} = req.query;

    try{
        const proveedorEncontrado = await tablaProveedor.findAll({
            where:{
                [Op.or]:[
                    {   identificacion: {[Op.eq]: identificacion}   },
                    {   nom_proveedor: {[Op.eq]: nom_proveedor}             }
                ],
                
                id: {
                    [Op.not]: id
                  }
            }
        });
        if(proveedorEncontrado!==null && proveedorEncontrado.length>0){
            res.json( {respuesta:true} );//True significa que encontro
        }else{
            res.json( {respuesta:false} );
        }
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}