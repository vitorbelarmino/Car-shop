import * as sinon from 'sinon';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import chai from 'chai';
import CarController from '../../../controllers/Car';
import { Request, Response } from 'express';
import { allCarsMock, carMock, carMockWithId, carUpdateMock, carUpdateMockWithId } from '../../mocks/carMocks';
import CustomError from '../../../helpers/CustomError';
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
    sinon.stub(carService, 'delete').resolves(carUpdateMockWithId);

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
      expect((res.status as sinon.SinonStub).calledWith(400)).to.not.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carUpdateMockWithId)).to.be.true;
    })

    // it('Testa se o body não for enviado', async () => {
    //   let err;
    //   req.params = { id: carMockWithId._id }
    //   try {
    //     await carController.update(req, res)
    //   } catch (error) {
    //     expect((error as CustomError).status).to.be.equal(400);
    //     expect((error as CustomError).message).to.be.equal('missing body');

    //     err = error
    //   }

    // })

  });

  describe('Testa o método delete', async () => {
    it('Testa sucesso', async () => {
      req.params = { id: carMockWithId._id }
      req.body = carUpdateMock
      await carController.delete(req, res)

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      // expect((res.status as sinon.SinonStub).calledWith(400)).to.not.be.true;
    })

  })
});