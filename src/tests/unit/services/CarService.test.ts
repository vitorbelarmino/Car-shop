import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { allCarsMock, carMock, carMockWithId, carUpdateMockWithId, idNotRegistered, invalidId } from '../../mocks/carMocks';
import CustomError from '../../../helpers/CustomError';
import errorMessage from '../../../helpers/ errorMessages';
const { expect } = chai;

describe('Testa o Service de Car', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel)

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves(allCarsMock);
    sinon.stub(carModel, 'readOne').resolves(carMockWithId);
    sinon.stub(carModel, 'update').resolves(carUpdateMockWithId);
    sinon.stub(carModel, 'delete').resolves(carMockWithId);
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
      const getCar = await carService.readOne(carMockWithId._id)

      expect(getCar).to.be.deep.equal(carMockWithId)
    })

    it('Testa falha ao mandar um id invalido', async () => {
      let err;
      try {
      await carService.readOne(invalidId)
      } catch (error) {       
        err = error
      }
      expect((err as CustomError).status).to.be.equal(400)
      expect((err as CustomError).message).to.be.equal(errorMessage.hexadecimal)
    })
  })

  describe('Testa o método "update"', () => {
    it('Testa sucesso', async () => {
      const updateCar = await carService.update(carMockWithId._id, carUpdateMockWithId)

      expect(updateCar).to.be.deep.equal(carUpdateMockWithId)
    })
  })

  describe('Testa o método "delete"', () => {
    it('Testa sucesso', async () => {
      const deletedCar = await carService.delete(carMockWithId._id)

      expect(deletedCar).to.be.deep.equal(carMockWithId)
    })

    it('Testa falha ao mandar um id invalido', async () => {
      let err;
      try {
      await carService.delete(invalidId)
      } catch (error) {       
        err = error
      }
      expect((err as CustomError).status).to.be.equal(400)
      expect((err as CustomError).message).to.be.equal(errorMessage.hexadecimal)
    })

    // it('Testa falha ao mandar um id que não esteja no banco de dados', async () => {
    //   let err;
    //   try {
    //     const get = await carService.delete(idNotRegistered)
    //     console.log(idNotRegistered);
        
    //     console.log(get);
    //   } catch (error) {       
    //     err = error
    //   }
      
    //   expect((err as CustomError).status).to.be.equal(404)
    //   expect((err as CustomError).message).to.be.equal(errorMessage.notFund)
    // })
  })

}); 