import { tablaRegistroPlacaCliente } from '../models/tablaRegistroPlacaCliente';
//import {tablaTipoDeIdentificacion} from '../models/Sri/tablaTipoDeIdentificacion'


export const createRegistro = async (req,res) =>{
    try{
        const {id_cliente,id_placa} = req.body;
        const registro = await tablaRegistroPlacaCliente.findOrCreate(
            {
                where:{
                    id_cliente:id_cliente,
                    id_placa: id_placa
                }
                
            }
        );

        res.json(registro);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    } 
    
}



export const getRegistro = async (req,res)=>{
    const {id} = req.params;
    try{
        const client = await tablaRegistroPlacaCliente.findOne({
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
