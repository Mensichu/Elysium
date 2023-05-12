import {Router} from 'express'
import {createMarca,getMarcas,getComboMarcas, updateMarca,updateMarcaAlias,deleteMarca,getMarcaById, getMarcasRepetidas,
        createAuto,getAutos,getComboAutosUnico,getDatasource,updateAuto,updateNomAuto,deleteAuto,getAutoById,getMarcaAutos, getAutosRepetidos, getTablaAutos} 
        from '../aSequelize/controllers/auto.controller/auto.controller'

const router = Router();


//Marca
router.get('/marcas',getMarcas);

router.get('/comboMarcas',getComboMarcas);

router.post('/marca',createMarca);

router.put('/marca/:id',updateMarca);

router.put('/marcaAlias/:id',updateMarcaAlias);

router.delete('/marca/:id',deleteMarca);
router.get('/marca/:id',getMarcaById);

router.get('/marca/:id/autos',getMarcaAutos);

router.get('/marcasRepetidas/:nom_marca',getMarcasRepetidas);


//Auto
router.get('/autos',getAutos);

router.get('/comboAutos/:id',getComboAutosUnico);

router.get('/tablaAutos',getTablaAutos);

//router.get('/borrar',getDatasource)

router.post('/auto',createAuto);

router.put('/auto/:id',updateAuto);
router.delete('/auto/:id',deleteAuto);

router.put('/nomAuto/:id',updateNomAuto);

router.get('/auto/:id',getAutoById);

router.get('/autosRepetidos',getAutosRepetidos);

export default router