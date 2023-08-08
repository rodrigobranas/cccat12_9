import CalculateRide from "./application/usecase/CalculateRide";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import MainController from "./infra/http/MainController";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HapiAdapter from "./infra/http/HapiAdapter";
import RequestRide from "./application/usecase/RequestRide";
import RideRepositoryDatabase from "./infra/repository/RideRepositoryDatabase";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";
import UsecaseFactory from "./application/factory/UsecaseFactory";
import Registry from "./infra/di/Registry";

// main composition root
const connection = new PgPromiseAdapter();
const rideRepository = new RideRepositoryDatabase(connection);
const calculateRide = new CalculateRide();
// const requestRide = new RequestRide(rideRepository);
const httpServer = new ExpressAdapter();
// const httpServer = new HapiAdapter();
const repositoryFactory = new RepositoryFactoryDatabase(connection);
const usecaseFactory = new UsecaseFactory(repositoryFactory);
const registry = Registry.getInstance();
registry.provide("calculateRide", calculateRide);
new MainController(httpServer, usecaseFactory);
httpServer.listen(3000);
