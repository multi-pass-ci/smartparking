import { Router } from 'express';
import { guardarCajon } from '../controllers/iot.controller.js';

const router = Router();

router.post('/cajones', guardarCajon);

export default router;
