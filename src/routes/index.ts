import { Router } from 'express';
import { carController, motorcycleController } from '../integrations';

const motorcycleID = '/motorcycles/:id';
const router = Router();

router.post('/cars', (req, res) => carController.create(req, res))
  .get('/cars', (req, res) => carController.read(req, res))
  .get('/cars/:id', (req, res) => carController.readOne(req, res))
  .put('/cars/:id', (req, res) => carController.update(req, res))
  .delete('/cars/:id', (req, res) => carController.delete(req, res))
  .post('/motorcycles', (req, res) => motorcycleController.create(req, res))
  .get('/motorcycles', (req, res) => motorcycleController.read(req, res))
  .get(motorcycleID, (req, res) => motorcycleController.readOne(req, res))
  .put(motorcycleID, (req, res) => motorcycleController.update(req, res))
  .delete(motorcycleID, (req, res) => motorcycleController.delete(req, res));

export default router;