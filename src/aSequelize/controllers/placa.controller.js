import {tablaMarca} from '../models/tablaMarca';
import {tablaAuto} from '../models/tablaAuto';





export const getPlacas = async (req,res) =>{
    try{
        const marcas = await tablaMarca.findAll();
        res.json(marcas);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }

}