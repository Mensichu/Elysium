import { tablaColor } from '../../models/Auto/tablaColor';


export const getComboColor = async (req,res) =>{
    try{
        const colors = await tablaColor.findAll({
            where:{estado:true},
            attributes: ['id','nom_color','hex_color'],
            order:[['nom_color','ASC']]
        });
        res.json(colors);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }

}



export const createColor = async (req,res) =>{
    try{
        const {nom_color,hex_color} = req.body;

        const color = await tablaColor.create(
            {
            nom_color,
            hex_color
            },
        );

        res.json(color);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    } 
    
}

/*
Borrar
export const updatePlaca = async (req,res)=>{
    const {id} = req.params;
    const {nom_placa,color1,color2,clave,obs_placa,id_auto} = req.body;
    try{
        const placa = await tablaPlaca.findByPk(id);
        if(placa!==null){
            //Al ser los mismos nombres de parametros se usa auto = req.body
            //si solo paso los campos que quiero actualizar el solo actualizo esos campos
            //auto.set(req.body) No deseo actualizar modelo y marca
            placa.nom_placa = nom_placa,
            placa.color1 =  color1,
            placa.color2 =  color2,
            placa.clave=    clave,
            placa.obs_placa=obs_placa,
            placa.id_auto=id_auto

            await placa.save();

            const datosfinales = await placaConAutoYMarca(placa.id);
            res.json(datosfinales);
        }else{
            res.status(404).json({message: 'placa not found'});
        }
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }


}
*/