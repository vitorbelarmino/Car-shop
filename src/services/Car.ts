import errorMessage from '../helpers/ errorMessages';
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
    if (id.length !== 24) throw new CustomError(400, errorMessage.hexadecimal);
    const car = await this._modelCar.readOne(id);
    if (!car) throw new CustomError(404, errorMessage.notFund);
    return car;
  }

  public async update(id: string, car: ICar) {
    if (!Object.keys(car).length) throw new CustomError(400, errorMessage.missingBody);
    if (id.length !== 24) throw new CustomError(400, errorMessage.hexadecimal);
    const getCar = await this._modelCar.readOne(id);
    if (!getCar) throw new CustomError(404, errorMessage.notFund);
    const updateCar = await this._modelCar.update(id, car);
    return updateCar;
  }

  public async delete(id: string) {
    if (id.length !== 24) throw new CustomError(400, errorMessage.hexadecimal);
    const getCar = await this._modelCar.readOne(id);
    if (!getCar) throw new CustomError(404, errorMessage.notFund);
    const deletedCar = await this._modelCar.delete(id);
    return deletedCar;
  }
}

export default CarService;