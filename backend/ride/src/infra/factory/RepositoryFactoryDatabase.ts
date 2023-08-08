import RepositoryFactory from "../../application/factory/RepositoryFactory";
import RideRepository from "../../application/repository/RideRepository";
import DatabaseConnection from "../database/DatabaseConnection";
import RideRepositoryDatabase from "../repository/RideRepositoryDatabase";

export default class RepositoryFactoryDatabase implements RepositoryFactory {

	constructor (readonly connection: DatabaseConnection) {
	}

	createRideRepository(): RideRepository {
		return new RideRepositoryDatabase(this.connection);
	}

}
