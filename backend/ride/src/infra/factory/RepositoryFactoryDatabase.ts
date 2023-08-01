import RepositoryFactory from "../../application/factory/RepositoryFactory";
import DriverRepository from "../../application/repository/DriverRepository";
import PassengerRepository from "../../application/repository/PassengerRepository";
import RideRepository from "../../application/repository/RideRepository";
import DatabaseConnection from "../database/DatabaseConnection";
import DriverRepositoryDatabase from "../repository/DriverRepositoryDatabase";
import PassengerRepositoryDatabase from "../repository/PassengerRepositoryDatabase";
import RideRepositoryDatabase from "../repository/RideRepositoryDatabase";

export default class RepositoryFactoryDatabase implements RepositoryFactory {

	constructor (readonly connection: DatabaseConnection) {
	}

	createPassengerRepository(): PassengerRepository {
		return new PassengerRepositoryDatabase(this.connection);
	}

	createDriverRepository(): DriverRepository {
		return new DriverRepositoryDatabase(this.connection);
	}

	createRideRepository(): RideRepository {
		return new RideRepositoryDatabase(this.connection);
	}

}
