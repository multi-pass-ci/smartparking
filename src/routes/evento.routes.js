import {
    registrarEvento,
    listarEventos,
    buscarEventoPorId,
    editarEvento,
    borrarEvento
  } from '../controllers/evento.controller.js';
  

const router = Router();

router.get('/eventos/:id', buscarEventoPorId); // Buscar evento por ID
router.get('/eventos', listarEventos);      // Ver todos
router.post('/eventos', registrarEvento);   // Crear evento
router.put('/eventos/:id', editarEvento);      // Editar
router.delete('/eventos/:id', borrarEvento);   // Eliminar

export default router;
