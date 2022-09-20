import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

class MotorcycleController {
  constructor(private service: IService<IMotorcycle>) { }

  public async create(req: Request, res: Response) {
    const motorcycle = req.body;
    const newMotorcycle = await this.service.create(motorcycle);
    res.status(201).json(newMotorcycle);
  }

  public async read(req: Request, res: Response) {
    const allMotorcycles = await this.service.read();
    res.status(200).json(allMotorcycles);
  }

  public async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const motorcycle = await this.service.readOne(id);
    res.status(200).json(motorcycle);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const motorcycle = req.body;
    const updateMotorcycle = await this.service.update(id, motorcycle);
    res.status(200).json(updateMotorcycle);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.delete(id);
    res.status(204).json({ message: 'motorcycle' });
  }
}

export default MotorcycleController;