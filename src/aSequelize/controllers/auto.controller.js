import {tablaMarca} from '../models/tablaMarca';
import {tablaAuto} from '../models/tablaAuto';





export const getMarcas = async (req,res) =>{
    try{
        const marcas = await tablaMarca.findAll();
        console.log(marcas);
        res.json(marcas);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }

}

export const createMarca = async (req,res) =>{
    try{
        const {nom_marca,alias}= req.body;

        const newMarca = await tablaMarca.create({
            nom_marca,
            alias
        })
        console.log(newMarca);
        res.send('creating Marca');
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}


export const updateMarca = async (req,res) =>{
    const {id} = req.params;
    const {nom_marca,alias} = req.body;
    try{
        const marca = await tablaMarca.findByPk(id);
        if(marca!==null){
            console.log(marca instanceof tablaMarca);
            marca.nom_marca=nom_marca;
            marca.alias=alias;

            await marca.save();

            res.json(marca);

        }else{
            console.log('Not found');
            res.send('not found');
        }
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}


export const deleteMarca = async (req,res) =>{
    try{
        console.log(req.params.id)
        const {id} = req.params
        await tablaMarca.destroy({
            where: {
                id
            }
        })
        res.sendStatus(204);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}


export const getMarcaById = async (req,res) =>{
    const {id} = req.params
    try{
        const marca = await tablaMarca.findOne({
            where:{
                id
            }
        });
        if(marca!==null){
            res.json(marca)
        }else{
            res.status(404).json({message: 'marca not found'});
        }
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}



export const getMarcaAutos = async (req,res) =>{
    const {id} = req.params;

    const autos = await tablaAuto.findAll({
        where: {
            id_marca:id
        },
        include: {
            model: tablaMarca,
            attributes: ['nom_marca']
        }
    });

    if(autos!==null){
        res.json(autos);
    }else{
        res.status(404).json({message: 'autos con id de marca no encontrados'})
    }
}





//------------------------------------- AUTO



export const getAutos = async (req,res) =>{
    try{
        const autos = await tablaAuto.findAll({
            where:{estado:true},
            attributes:['nom_auto','ano','cilindraje','combustible'],
            include:{
                model: tablaMarca,
                attributes: ['nom_marca']
            }
        });
        res.json(autos);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    }
}

export const getTablaAutos = async (req,res) =>{
    try{
        const autos = await tablaAuto.findAll({
            where:{estado:true},
            attributes:['nom_auto','ano','cilindraje','combustible'],
            include:{
                model: tablaMarca,
                attributes: ['nom_marca']
            }
        });
        res.json(autos);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    }
}

export const createAuto = async (req,res) =>{
    try{
        const {nom_auto,ano,cilindraje,consumo_motor,consumo_caja,combustible,id_marca} = req.body;

        const auto = await tablaAuto.create({
            nom_auto,
            ano,
            cilindraje,
            consumo_motor,
            consumo_caja,
            combustible,
            id_marca
        });
        res.json(auto);
    }catch(error){
        //500 es un error que indica q es error del servidor
        return res.status(500).json({ message: error.message });
    }   
}


export const getAutoById = async (req,res)=>{
    const {id} = req.params;
    try{
        const auto = await tablaAuto.findOne({
            where:{id},
            attributes: ['nom_auto']
        })
        if (auto!==null){
            res.json(auto);
        }else{
            res.status(404).json({message: 'auto not found'});
        }
    }catch(error){
        return res.status(500).json({message:error.message});
    }
    
}


export const updateAuto = async (req,res)=>{
    const {id} = req.params;

    try{
        const auto = await tablaAuto.findByPk(id);
        if(auto!==null){
            //Al ser los mismos nombres de parametros se usa auto = req.body
            //si solo paso los campos que quiero actualizar el solo actualizo esos campos
            auto.set(req.body)
            
            await auto.save();

            res.json(auto);
        }else{
            res.status(404).json({message: 'auto not found'});
        }
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }


}

export const deleteAuto = async (req,res)=>{
    const {id}= req.params;
    try{
        const auto = await tablaAuto.findByPk(id);
        if(auto!==null){
            await auto.destroy({
                where: id
            });
            return res.sendStatus(204);
        }else{
            res.status(404).json({message: 'auto not found'});
        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }

}