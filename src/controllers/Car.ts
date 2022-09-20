import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

class CarController {
  constructor(private service: IService<ICar>) {}

  public async create(req: Request, res: Response) {
    const car = req.body;
    const newCar = await this.service.create(car);
    res.status(201).json(newCar);
  }

  public async read(req: Request, res: Response) {
    const cars = await this.service.read();
    return res.status(200).json(cars);
  }

  public async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const getCar = await this.service.readOne(id);
    res.status(200).json(getCar);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const car = req.body;
    const updateCar = await this.service.update(id, car);
    res.status(200).json(updateCar);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.delete(id);
    res.status(204).json({ message: 'car excluded' });
  }
}

export default CarController;