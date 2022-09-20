import errorMessage from '../helpers/ errorMessages';
import CustomError from '../helpers/CustomError';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, motorcycleSchema } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

class MotorcycleService implements IService<IMotorcycle> {
  private _modelMotorcycle: IModel<IMotorcycle>;
  constructor(model:IModel<IMotorcycle>) {
    this._modelMotorcycle = model;
  }

  public async create(motorcycle: IMotorcycle) {
    const { success } = motorcycleSchema.safeParse(motorcycle);
    if (!success) throw new CustomError(400, 'Invalid Motorcycle Object');
    const newMotorcycle = await this._modelMotorcycle.create(motorcycle);
    return newMotorcycle;
  }

  public async read() {
    const allMotorcycles = await this._modelMotorcycle.read();
    return allMotorcycles;
  }

  public async readOne(id: string) {
    if (id.length !== 24) throw new CustomError(400, errorMessage.hexadecimal);
    const motorcycle = await this._modelMotorcycle.readOne(id);
    if (!motorcycle) throw new CustomError(404, errorMessage.notFund);
    console.log(motorcycle);
    
    return motorcycle;
  }

  public async update(id: string, motorcycle: IMotorcycle) {
    if (!Object.keys(motorcycle).length) throw new CustomError(400, errorMessage.missingBody);
    if (id.length !== 24) throw new CustomError(400, errorMessage.hexadecimal);
    const getMotorcycle = await this._modelMotorcycle.readOne(id);
    if (!getMotorcycle) throw new CustomError(404, errorMessage.notFund);
    const updateMotorcycle = await this._modelMotorcycle.update(id, motorcycle);
    return updateMotorcycle;
  }

  public async delete(id: string) {
    if (id.length !== 24) throw new CustomError(400, errorMessage.hexadecimal);
    const getMotorcycle = await this._modelMotorcycle.readOne(id);
    if (!getMotorcycle) throw new CustomError(404, errorMessage.notFund);
    const deletedMotorcycle = await this._modelMotorcycle.delete(id);
    return deletedMotorcycle;
  }
}

export default MotorcycleService;
