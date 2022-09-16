import CarController from '../controllers/Car';
import CarModel from '../models/Car';
import CarService from '../services/Car';

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

export default carController;