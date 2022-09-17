import { isValidObjectId } from 'mongoose';
import CustomError from './CustomError';

function validateId(id: string) {
  if (id.length < 24) throw new CustomError(400, 'Id must have 24 hexadecimal characters');
  if (!isValidObjectId(id)) throw new CustomError(401, 'Object not found');
}

export default validateId;