import {tablaAuto} from '../../models/Auto/tablaAuto';
import {tablaMarca} from '../../models/Auto/tablaMarca';
import {tablaPlaca} from '../../models/tablaPlaca';
import {tablaCliente} from '../../models/tablaCliente';
import {tablaRegistroPlacaCliente} from '../../models/tablaRegistroPlacaCliente';

/*
import {tablaProductoSeccion} from '../../models/Productos/tablaProductoSeccion';
import {tablaProductCategory} from '../../models/Productos/tablaProductCategory'
import {tablaRegistroProveedorProducto} from '../../models/Productos/tablaRegistroProveedorProducto';
*/


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ RELACION PLACA CLIENTE


export const createRelacionPC = async (req,res) =>{
    try{
        //Validamos que el cliente y la placa existan
        const cliente = await tablaCliente.findByPk(req.body.id_cliente);
        if (!cliente) {
            return res.status(400).json({ message: 'El cliente no existe' });
        }
        const placa = await tablaPlaca.findByPk(req.body.id_placa);
        if (!placa) {
            return res.status(400).json({ message: 'La placa no existe' });
        }
        const relacionPC = await tablaRegistroPlacaCliente.findOrCreate({
            where: req.body
        });
        res.json(relacionPC);
        
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}




export const deleteRelacionPC = async (req,res)=>{
    
    try{
        const relacion = await tablaRegistroPlacaCliente.findOne({
            where:
            [
                {
                    id_cliente:req.body.id_cliente,
                    id_placa:req.body.id_placa
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



export const getClientesRelacion = async (req,res) =>{
    try{
        const clientes = await tablaCliente.findAll({
            attributes: ['id','identificacion','apellidos_empresa','nombres']
            
        });
        res.json(clientes);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}



export const getPlacasRelacion = async (req,res) =>{
    try{
        const placas = await tablaPlaca.findAll({
            attributes: ['id','nom_placa'],
            include: [
                {
                model: tablaAuto,
                attributes: ['nom_auto', 'ano', 'cilindraje','combustible'],
                include: {
                    model: tablaMarca,
                    attributes: ['nom_marca','alias']
                }
                }
            ]
            
        });
        res.json(placas);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}




export const getClienteRelacionById = async (req,res)=>{
    const {id} = req.params;
    try{
        const client = await tablaCliente.findOne({
            where:{id},
            attributes: ['id'],
        });
        if (client!==null){
            //res.json(client);
            // Obtener los registros del cliente
            const registros = await client.getRegistros();
            // Mapear los registros para obtener la información de la placa
            const placas = await Promise.all(registros.map(async registro => {
                const placa = await registro.getPlaca({
                    attributes: ['id','nom_placa'],
                    include: [
                        {
                        model: tablaAuto,
                        attributes: ['nom_auto', 'ano', 'cilindraje','combustible'],
                        include: {
                            model: tablaMarca,
                            attributes: ['nom_marca','alias']
                        }
                        }
                    ]
                });
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



export const getPlacaRelacionById = async (req,res)=>{
    const {id} = req.params;
    try{
        const placa = await tablaPlaca.findOne({
            where:{id},
            attributes: ['id'],
        });
        if (placa!==null){
            //res.json(client);
            // Obtener los registros de la placa
            const registros = await placa.getRegistros();
            // Mapear los registros para obtener la información de la placa
            const clients = await Promise.all(registros.map(async registro => {
                const client = await registro.getCliente({
                    attributes:['id','identificacion','apellidos_empresa','nombres']
                });
                return client.toJSON();
            }));
            // Agregar la información de la placa al objeto del cliente
            const placaConClientes = placa.toJSON();
            placaConClientes.clients = clients;
            res.json(placaConClientes);
        }else{
            res.status(404).json({message: 'placa not found'});
        }
    }catch(error){
        return res.status(500).json({message:error.message});
    }
    
}


