import { Request, Response } from 'express';
import CustomError from '../helpers/CustomError';
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

  public async readOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const getCar = await this.service.readOne(id);
    return res.status(200).json(getCar);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const car = req.body;
    
    if (!Object.keys(car).length) throw new CustomError(400, 'missing body');

    const updateCar = await this.service.update(id, car);
    return res.status(200).json(updateCar);
  }
  
  // public async delete(id: string) {
  //   const result = await this._modelCar.delete(id);
  //   return result;
  // }
}

export default CarController;