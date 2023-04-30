import {tablaProductCategory} from '../../models/Productos/tablaProductCategory';


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CATEGORIAS


export const createCategoriaPadre = async (req,res) =>{
    try{
        const {name}= req.body;

        const categoriaPadre = await tablaProductCategory.create({
            name
        })
        res.json(categoriaPadre);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}



export const createCategoriaHijo = async (req,res) =>{
    try{
        const {name,parentCategoryId}= req.body;

        const categoriaHijo = await tablaProductCategory.create({
            name,
            parentCategoryId
        })
        res.json(categoriaHijo);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}



export const getCategorias = async (req,res) =>{
    try{
        let {id}= req.params;
        id=id==0?null:id;
        const categorias = await tablaProductCategory.findAll({
            where: {parentCategoryId:id}
        })
        res.json(categorias);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}