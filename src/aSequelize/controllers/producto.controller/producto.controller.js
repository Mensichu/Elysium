import {tablaProducto} from '../../models/Productos/tablaProducto';
import {tablaProveedor} from '../../models/Pedidos/tablaProveedor';
import {tablaProductoSeccion} from '../../models/Productos/tablaProductoSeccion';
import {tablaProductCategory} from '../../models/Productos/tablaProductCategory'
import {tablaRegistroProveedorProducto} from '../../models/Productos/tablaRegistroProveedorProducto';


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PRODUCTOS


export const createProducto = async (req,res) =>{
    try{
        //Validamos que el proveedor exista
        const proveedor = await tablaProveedor.findByPk(req.body.id_proveedor);
        if (!proveedor) {
            return res.status(400).json({ message: 'El proveedor no existe' });
        }
        //Creamos el producto
        const producto = await tablaProducto.create(req.body);
        //Agregamos la relacion del proveedor con el producto---------------------------------------registroProductoProveedor
        await proveedor.addProducto(producto, { through: { costosiniva: req.body.costosiniva } });
        res.json(producto);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export const updateProducto = async (req,res)=>{
    const {id} = req.params;
    
    try{
        const producto = await tablaProducto.findByPk(id);
        if(producto!==null){

            producto.set(req.body);

            await producto.save();
            
            res.json(producto);
            
        }else{
            res.status(404).json({message: 'product not found'});
        }
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}


export const getProducto = async (req,res)=>{
    const {id} = req.params;
    try{
        //obtenemos un producto mediante su id
        const producto = await tablaProducto.findOne({
            where:{id},
            attributes:{
                exclude:['estado','createdAt','updatedAt']
            },
            include:[
                {
                    model:tablaProveedor,
                    attributes:['id'],
                    //excluye los atributos de la tablaProveedorProducto relacional
                    through: { attributes: [] }, // Exclude junction table attributes
                    
                },
                /*
                {
                    model:tablaProductoSeccion,
                    attributes:['cod_seccion','nom_seccion']
                }
                */
                /*,
                //No lo necesito, se puede hacer como otra funcion
                //requiere subgrupo, grupo, categoria y tipo.
                {
                    model:tablaProductCategory,
                    attributes: ['name']
                }*/
            ]
        });
        if (producto!==null){
            res.json(producto);
        }else{
            res.status(404).json({message: 'product not found'});
        }
    }catch(error){
        return res.status(500).json({message:error.message});
    }
    
}


import Sequelize from 'sequelize';
const { Op } = require("sequelize");

export const getTablaProductos = async (req,res) =>{
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
        const productos = await tablaProducto.findAndCountAll({
            where: 
                {
                    estado:true,
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('upper', Sequelize.col('marca')), 'LIKE', `%${searchString1}%`),
                    ],
                    [Op.or]: [
                        Sequelize.where(Sequelize.fn('upper', Sequelize.col('nom_producto')), 'LIKE', `%${searchString2}%`),
                        Sequelize.where(Sequelize.fn('upper', Sequelize.col('cod1')), 'LIKE', `%${searchString2}%`),
                        Sequelize.where(Sequelize.fn('upper', Sequelize.col('cod2')), 'LIKE', `%${searchString2}%`),
                        Sequelize.where(Sequelize.fn('upper', Sequelize.col('cod3')), 'LIKE', `%${searchString2}%`)
                    ],
                },
            attributes:['id','marca','nom_producto'],
            include:[
                {
                    model:tablaProveedor,
                    attributes:['nom_proveedor'],
                    //excluye los atributos de la tablaProveedorProducto relacional
                    through: { attributes: [] }, // Exclude junction table attributes
                    
                },
            ]
        });
        res.json(productos);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

//Este combo sirve para obtener una referencia de un producto nuevo a ingresar, con sus %Gan
export const getComboProductos = async (req,res) =>{
    const {id} = req.params;
    try{
        const productos = await tablaProducto.findAll({
            where:{id_subgrupo:id},
            
            attributes: ['id','nom_producto','porcentaje1','porcentaje2','porcentaje3']
            
        });
        res.json(productos);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}


export const getComboSeccion = async (req,res) =>{
    try{
        //Devuelve todas las secciones para ser mostradas en el combo
        const seccion = await tablaProductoSeccion.findAll({
            attributes:['id','cod_seccion','nom_seccion'],
            
            
            order:[['cod_seccion','ASC']]
        });
        res.json(seccion);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    }
}



//Creamos una nueva clasificacion en Productos/clasificaciones
export const createSeccion = async (req,res) =>{
    try{
        //Cremos una nueva seccion de la empresa
        const seccion = await tablaProductoSeccion.create(req.body);
        
        res.json(seccion);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}



//No se usa


/*
export const getProductoSubgrupo = async (req,res) =>{
    const listaIds = JSON.parse(req.query.ids);
    try{
        const productos = await tablaProducto.findAll({
            where: {
                id_subgrupo: {
                  [Op.in]: listaIds
                }
            },
            attributes:['id','nom_producto','id_subgrupo'],
        });
        res.json(productos);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}
*/