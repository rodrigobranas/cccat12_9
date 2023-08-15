import CreateDriver from "../usecase/CreateDriver";
import CreatePassenger from "../usecase/CreatePassenger";
import GetDriver from "../usecase/GetDriver";
import GetPassenger from "../usecase/GetPassenger";
import RepositoryFactory from "./RepositoryFactory";

export default class UsecaseFactory {

	constructor (readonly repositoryFactory: RepositoryFactory) {
	}

	createCreatePassenger () {
		return new CreatePassenger(this.repositoryFactory.createPassengerRepository(), this.repositoryFactory.createUserRepository());
	}

	createCreateDriver () {
		return new CreateDriver(this.repositoryFactory.createDriverRepository());
	}

	createGetPassenger () {
		return new GetPassenger(this.repositoryFactory.createPassengerRepository(), this.repositoryFactory.createUserRepository());
	}

	createGetDriver () {
		return new GetDriver(this.repositoryFactory.createDriverRepository());
	}

}