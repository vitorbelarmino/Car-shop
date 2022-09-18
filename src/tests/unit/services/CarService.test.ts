import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { allCarsMock, carMock, carMockWithId, carUpdateMockWithId } from '../../mocks/carMocks';
import CustomError from '../../../helpers/CustomError';
const { expect } = chai;

describe('Testa o Service de Car', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel)

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves(allCarsMock);
    sinon.stub(carModel, 'readOne').resolves(carMockWithId);
    sinon.stub(carModel, 'update').resolves(carUpdateMockWithId);
  });

  after(()=>{
    sinon.restore();
  })
  
  describe('Testa o método "create"', () => {
    it('Testa sucesso', async () => {
      const newCar = await carService.create(carMock)

      expect(newCar).to.be.deep.equal(carMockWithId)
    })

    it('Testa se falha ao receber object car invalido', async () => {
      let err;
      try {
        const newCar = await carService.create({} as any)
      } catch (error) {
        err = error
      }
      expect(err).to.be.instanceOf(CustomError)
      expect((err as CustomError).status).to.be.equal(400)
      expect((err as CustomError).message).to.be.equal('Invalid Car Object')
    })
  });

  describe('Testa o método "read"', () => {
    it('Testa sucesso', async () => {
      const allCars = await carService.read()

      expect(allCars).to.be.deep.equal(allCarsMock)
    })
  })
  
  describe('Testa o método "readOne"', () => {
    it('Testa sucesso', async () => {
      const getCar = await carService.readOne('632643caf4fac59e74ce7def')

      expect(getCar).to.be.deep.equal(carMockWithId)
    })

    it('Testa falha ao mandar um id invalido', async () => {
      let err;
      try {
      await carService.readOne('632643caf4fac59e74ce7de')
      } catch (error) {
        err = error
      }
      expect((err as CustomError).status).to.be.equal(400)
      expect((err as CustomError).message).to.be.equal('Id must have 24 hexadecimal characters')
    })
  })

  describe('Testa o método "update"', () => {
    it('Testa sucesso', async () => {
      const updateCar = await carService.update('632643caf4fac59e74ce7def', carUpdateMockWithId)

      expect(updateCar).to.be.deep.equal(carUpdateMockWithId)
    })
  })



}); 