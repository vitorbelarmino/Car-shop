import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

class CarController {
  constructor(private service: IService<ICar>) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const car = req.body;
    const newCar = await this.service.create(car);
    return res.status(201).json(newCar);
  }

  public async read(req: Request, res: Response): Promise<Response> {
    const cars = await this.service.read();
    return res.status(200).json(cars);
  }

  // public async readOne(id: string) {
  //   const getCar = await this._modelCar.readOne(id);
  //   return getCar;
  // }

  // public async update(id: string, car: ICar) {
  //   const updateCar = await this._modelCar.update(id, car);
  //   return updateCar;
  // }

  // public async delete(id: string) {
  //   const result = await this._modelCar.delete(id);
  //   return result;
  // }
}

export default CarController;