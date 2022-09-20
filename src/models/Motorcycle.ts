import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcycleSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, {
  versionKey: false,
});

class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycle', motorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;