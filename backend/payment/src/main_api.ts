import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import MainController from "./infra/http/MainController";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import RideRepositoryDatabase from "./infra/repository/TransactionRepositoryDatabase";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";
import Registry from "./infra/di/Registry";
import TransactionRepositoryDatabase from "./infra/repository/TransactionRepositoryDatabase";
import ProcessPayment from "./application/usecase/ProcessPayment";
import PayPalGateway from "./infra/gateway/PayPalGateway";
import GetTransaction from "./application/usecase/GetTransaction";

// main composition root
const connection = new PgPromiseAdapter();
const transactionRepository = new TransactionRepositoryDatabase(connection);
const httpServer = new ExpressAdapter();
const registry = Registry.getInstance();
const paymentGateway = new PayPalGateway();
const processPayment = new ProcessPayment(transactionRepository, paymentGateway);
const getTransaction = new GetTransaction(transactionRepository);
registry.provide("processPayment", processPayment);
registry.provide("getTransaction", getTransaction);
new MainController(httpServer);
httpServer.listen(3001);
