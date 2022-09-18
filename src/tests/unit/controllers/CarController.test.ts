import * as sinon from 'sinon';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import chai from 'chai';
import CarController from '../../../controllers/Car';
import { Request, Response } from 'express';
import { allCarsMock, carMock, carMockWithId, carUpdateMock, carUpdateMockWithId } from '../../mocks/carMocks';
const { expect } = chai;

describe('Testa o controller de Car', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService)
  const req = {} as Request;
  const res = {} as Response;
  before(async () => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
    sinon.stub(carService, 'read').resolves(allCarsMock);
    sinon.stub(carService, 'readOne').resolves(carMockWithId);
    sinon.stub(carService, 'update').resolves(carUpdateMockWithId);

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(res)
  });

  after(()=>{
    sinon.restore();
  })

  describe('Testa o método create', async () => {
    it('Testa sucesso', async () => {
      req.body = carMock;
      await carController.create(req, res)

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    })
  });

  describe('Testa o método read', async () => {
    it('Testa sucesso', async () => {
      await carController.read(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(allCarsMock)).to.be.true;
    })
  });

  describe('Testa o método readOne', async () => {
    it('Testa sucesso', async () => {
      req.params = { id: carMockWithId._id }
      await carController.readOne(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    })
  });

  describe('Testa o método update', async () => {
    it('Testa sucesso', async () => {
      req.params = { id: carMockWithId._id }
      req.body = carUpdateMock
      await carController.update(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carUpdateMockWithId)).to.be.true;
    })
  });
});