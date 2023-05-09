import {tablaAuto} from '../../models/Auto/tablaAuto';
import {tablaMarca} from '../../models/Auto/tablaMarca';
import {tablaProducto} from '../../models/Productos/tablaProducto';
import {tablaRegistroProductoAuto} from '../../models/Productos/tablaRegistroProductoAuto';


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ RELACION PLACA PRODUCTO


export const createRelacionPA = async (req,res) =>{
    try{
        //Validamos que el producto y la placa existan
        const producto = await tablaProducto.findByPk(req.body.id_producto);
        if (!producto) {
            return res.status(400).json({ message: 'El producto no existe' });
        }
        const auto = await tablaAuto.findByPk(req.body.id_auto);
        if (!auto) {
            return res.status(400).json({ message: 'La auto no existe' });
        }
        const relacionPC = await tablaRegistroProductoAuto.findOrCreate({
            where: req.body
        });
        res.json(relacionPC);
        
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}


export const deleteRelacionPA = async (req,res)=>{

    try{
        const relacion = await tablaRegistroProductoAuto.findOne({
            where:
            [
                {
                    id_producto:req.body.id_producto,
                    id_auto:req.body.id_auto
                }
            ]
        });
        if(relacion!==null){
            await relacion.destroy();

            return res.sendStatus(204);
        }else{
            res.status(404).json({message: 'relacion not found'});
        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }

}



export const getProductosRelacion = async (req,res) =>{
    try{
        const productos = await tablaProducto.findAll({
            attributes: ['id','marca','nom_producto']
            
        });
        res.json(productos);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}



export const getAutosRelacion = async (req,res) =>{
    try{
        const autos = await tablaAuto.findAll({
            attributes: ['id','nom_auto', 'ano', 'cilindraje','combustible'],
            include: [
                {
                model: tablaMarca,
                attributes: ['nom_marca','alias'],
                }
            ]
            
        });
        res.json(autos);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}




export const getProductoRelacionById = async (req,res)=>{
    const {id} = req.params;
    try{
        const producto = await tablaProducto.findOne({
            where:{id},
            attributes: ['id'],
        });
        if (producto!==null){
            //res.json(client);
            // Obtener los registros del producto
            const registros = await producto.getRegistros();
            // Mapear los registros para obtener la información de la auto
            const autos = await Promise.all(registros.map(async registro => {
                const auto = await registro.getAuto({
                    attributes: ['id','nom_auto', 'ano', 'cilindraje','combustible'],
                    include: [
                        {
                        model: tablaMarca,
                        attributes: ['nom_marca','alias'],
                        }
                    ]
                });
                return auto.toJSON();
            }));
            // Agregar la información del auto al objeto del producto
            const productoConAutos = producto.toJSON();
            productoConAutos.autos = autos;
            res.json(productoConAutos);
        }else{
            res.status(404).json({message: 'producto not found'});
        }
    }catch(error){
        return res.status(500).json({message:error.message});
    }
    
}



export const getAutoRelacionById = async (req,res)=>{
    const {id} = req.params;
    try{
        const auto = await tablaAuto.findOne({
            where:{id},
            attributes: ['id'],
        });
        if (auto!==null){
            // Obtener los registros del auto
            const registros = await auto.getRegistros();
            // Mapear los registros para obtener la información del auto
            const productos = await Promise.all(registros.map(async registro => {
                const producto = await registro.getProducto({
                    attributes:['id','marca','nom_producto']
                });
                return producto.toJSON();
            }));
            // Agregar la información del auto al objeto del producto
            const autoConProductos = auto.toJSON();
            autoConProductos.productos = productos;
            res.json(autoConProductos);
        }else{
            res.status(404).json({message: 'auto not found'});
        }
    }catch(error){
        return res.status(500).json({message:error.message});
    }
    
}

