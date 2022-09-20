import CarController from '../controllers/Car';
import MotorcycleController from '../controllers/MotorCycle';
import CarModel from '../models/Car';
import MotorcycleModel from '../models/Motorcycle';
import CarService from '../services/Car';
import MotorcycleService from '../services/MotorCycle';

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

const Motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(Motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

export {
  carController,
  motorcycleController,
};
