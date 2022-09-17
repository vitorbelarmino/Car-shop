import CustomError from '../helpers/CustomError';
import { carSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

class CarService implements IModel<ICar> {
  private _modelCar: IModel<ICar>;
  constructor(model:IModel<ICar>) {
    this._modelCar = model;
  }

  public async create(car: ICar) {
    const { success } = carSchema.safeParse(car);
    if (!success) throw new CustomError(400, 'Invalid Car Object');
    const newCar = await this._modelCar.create(car);
    return newCar;
  }

  public async read() {
    const cars = await this._modelCar.read();
    return cars;
  }

  public async readOne(id: string) {
    if (id.length !== 24) throw new CustomError(400, 'Id must have 24 hexadecimal characters');
    const car = await this._modelCar.readOne(id);
    if (!car) throw new CustomError(404, 'Object not found');
    return car;
  }

  public async update(id: string, car: ICar) {
    if (id.length !== 24) throw new CustomError(400, 'Id must have 24 hexadecimal characters');
    const getCar = await this._modelCar.readOne(id);
    if (!getCar) throw new CustomError(404, 'Object not found');
    const updateCar = await this._modelCar.update(id, car);
    return updateCar;
  }

  public async delete(id: string) {
    const result = await this._modelCar.delete(id);
    return result;
  }
}

export default CarService;