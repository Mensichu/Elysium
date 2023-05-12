import {tablaPagination} from '../models/tablaPagination';



export const createPagination = async (req,res) =>{
    try{
        const pagination = await tablaPagination.create(req.body);
        res.json(pagination);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    } 
    
}


export const getAllPaginations = async (req,res) =>{
    try{
        const paginations = await tablaPagination.findAll(
            {
                where:
                    {
                        estado:true
                    },
                attributes:{
                    exclude:['estado','createdAt','updatedAt']
                },
                order: [['num_pagination','ASC']]
            });
        res.json(paginations);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    } 
    
}