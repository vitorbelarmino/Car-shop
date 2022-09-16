import { Router } from 'express';
import carController from '../integrations';

const router = Router();

router.post('/cars', (req, res) => carController.create(req, res))
  .get('/cars', (req, res) => carController.read(req, res));

export default router;