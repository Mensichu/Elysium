import {tablaProducto} from '../../models/Productos/tablaProducto';
import {tablaProveedor} from '../../models/Pedidos/tablaProveedor';
import {tablaProductoSeccion} from '../../models/Productos/tablaProductoSeccion';
import {tablaProductCategory} from '../../models/Productos/tablaProductCategory'
import {tablaRegistroProveedorProducto} from '../../models/Productos/tablaRegistroProveedorProducto';


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CATEGORIAS


export const createProducto = async (req,res) =>{
    try{
        //Validamos que el proveedor exista
        const proveedor = await tablaProveedor.findByPk(req.body.id_proveedor);
        if (!proveedor) {
            return res.status(400).json({ message: 'El proveedor no existe' });
        }
        //Creamos el producto
        const producto = await tablaProducto.create(req.body);
        //Agregamos la relacion del proveedor con el producto
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
            //Al ser los mismos nombres de parametros se usa auto = req.body
            //si solo paso los campos que quiero actualizar el solo actualizo esos campos
            //auto.set(req.body) No deseo actualizar modelo y marca
            producto.set(req.body);

            await producto.save();
            
            res.json(producto);
            
        }else{
            res.status(404).json({message: 'producto not found'});
        }
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const createSeccion = async (req,res) =>{
    try{
        const seccion = await tablaProductoSeccion.create(req.body);
        //Agregamos la relacion del proveedor con el producto
        
        res.json(seccion);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}


export const getProducto = async (req,res)=>{
    const {id} = req.params;
    try{
        const producto = await tablaProducto.findOne({
            where:{id},
            attributes:{
                exclude:['estado','createdAt','updatedAt']
            },
            include:[
                {
                    model:tablaProveedor,
                    attributes:['id','nom_proveedor'],
                    //excluye los atributos de la tablaProveedorProducto relacional
                    through: { attributes: [] }, // Exclude junction table attributes
                    
                },
                {
                    model:tablaProductoSeccion,
                    attributes:['cod_seccion','nom_seccion']
                }
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


//Este devuelve todos los datos, mediante una funcion en el front End se ordena los datos.
export const getProductos = async (req,res) =>{
    try{
        const productos = await tablaProducto.findAll({
            attributes:{
                exclude:['createdAt','updatedAt']
            },
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


export const getComboSeccion = async (req,res) =>{
    try{
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