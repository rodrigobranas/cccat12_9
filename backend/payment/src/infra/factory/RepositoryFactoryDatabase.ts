
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import TransactionRepository from "../../application/repository/TransactionRepository";
import DatabaseConnection from "../database/DatabaseConnection";
import TransactionRepositoryDatabase from "../repository/TransactionRepositoryDatabase";
import RideRepositoryDatabase from "../repository/TransactionRepositoryDatabase";

export default class RepositoryFactoryDatabase implements RepositoryFactory {

	constructor (readonly connection: DatabaseConnection) {
	}

	createTransactionRepository(): TransactionRepository {
		return new TransactionRepositoryDatabase(this.connection);
	}
	

	

}
