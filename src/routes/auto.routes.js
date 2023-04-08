import {Router} from 'express'
import {createMarca,getMarcas,getComboMarcas, updateMarca,updateMarcaAlias,deleteMarca,getMarcaById,
        createAuto,getAutos,getComboAutos,getTablaAutos,updateAuto,deleteAuto,getAutoById,getMarcaAutos} from '../aSequelize/controllers/auto.controller'

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


//Auto
router.get('/autos',getAutos);

router.get('/comboAutos/:id',getComboAutos);

router.get('/tablaAutos',getTablaAutos);

router.post('/auto',createAuto);

router.put('/auto/:id',updateAuto);
router.delete('/auto/:id',deleteAuto);

router.get('/auto/:id',getAutoById);


export default router