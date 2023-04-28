import { tablaUser } from '../../models/Users/tablaUser';



export const createUser = async (req,res) =>{
    try{
        
        const user = await tablaUser.create(
            req.body
        );

        res.json(user);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    } 
    
}