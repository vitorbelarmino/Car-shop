import { z } from 'zod';
import { vehicleSchema } from './IVehicle';

const carSchema = vehicleSchema.extend({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),

});

export type ICar = z.infer<typeof carSchema>;
export { carSchema };
