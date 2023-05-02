import { tablaProveedor } from '../../models/Pedidos/tablaProveedor';
import { tablaProducto } from '../../models/Productos/tablaProducto';
import {tablaTipoDeIdentificacion} from '../../models/Sri/tablaTipoDeIdentificacion'

export const createProveedor = async (req,res) =>{
    try{
        const { tipo, identificacion, nom_proveedor, representante, cuenta1_nombre, cuenta1_numero, cuenta2_nombre,
             cuenta2_numero, telefono1, telefono2, telefono3, direccion, correo, obs_proveedor } = req.body;

        const proveedorNew = await tablaProveedor.create(
            { tipo, identificacion, nom_proveedor, representante, cuenta1_nombre, cuenta1_numero, cuenta2_nombre,
                cuenta2_numero, telefono1, telefono2, telefono3, direccion, correo, obs_proveedor }
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
            //Al ser los mismos nombres de parametros se usa auto = req.body
            //si solo paso los campos que quiero actualizar el solo actualizo esos campos
            //auto.set(req.body) No deseo actualizar modelo y marca
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

export const getTablaProveedores = async (req,res) =>{
    try{
        const proveedores = await tablaProveedor.findAll({
            where:{estado:true},
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