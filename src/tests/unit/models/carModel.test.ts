import * as sinon from 'sinon';
import chai from 'chai';
import car from '../../../models/Car';
import { Model } from 'mongoose';
import { allCarsMock, carMock, carMockWithId, carUpdateMockWithId } from '../../mocks/carMocks';
const { expect } = chai;

describe('Testa o model de Car', () => {
  const carModel = new car()

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves(allCarsMock);
    sinon.stub(Model, 'findById').resolves(carMockWithId);
    sinon.stub(Model, 'findOneAndUpdate').resolves(carUpdateMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Testa o método "crete"', () => {
    it('Testa se cria um carro com sucesso', async() => {
      const newCar = await carModel.create(carMock)
      
      expect(newCar).to.be.deep.equal(carMockWithId)
    })
  });

  describe('Testa o método "read"', () => {
    it('Testa o retorno de todos os carros no banco de dados', async() => {
      const allCars = await carModel.read()
      expect(allCars).to.be.deep.equal(allCarsMock)
    })
  })

  describe('Testa o método "readOne"', () => {
    it('Testa o retorno de um carro pelo ID', async() => {
      const getCar = await carModel.readOne('id corrento')
      expect(getCar).to.be.deep.equal(carMockWithId)
    })
  })

  describe('Testa o método "update"', () => {
    it('Testa a alteração de um carro pelo ID', async() => {
      const updateCar = await carModel.update('id corrento',carUpdateMockWithId)
      expect(updateCar).to.be.deep.equal(carUpdateMockWithId)
    })
  })

});