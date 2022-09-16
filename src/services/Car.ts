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
    const getCar = await this._modelCar.readOne(id);
    return getCar;
  }

  public async update(id: string, car: ICar) {
    const updateCar = await this._modelCar.update(id, car);
    return updateCar;
  }

  public async delete(id: string) {
    const result = await this._modelCar.delete(id);
    return result;
  }
}

export default CarService;