import CalculateRide from "../usecase/CalculateRide";
import CreateDriver from "../usecase/CreateDriver";
import CreatePassenger from "../usecase/CreatePassenger";
import GetDriver from "../usecase/GetDriver";
import GetPassenger from "../usecase/GetPassenger";
import GetRide from "../usecase/GetRide";
import RequestRide from "../usecase/RequestRide";
import RepositoryFactory from "./RepositoryFactory";

export default class UsecaseFactory {

	constructor (readonly repositoryFactory: RepositoryFactory) {
	}

	createCreatePassenger () {
		return new CreatePassenger(this.repositoryFactory.createPassengerRepository());
	}

	createCreateDriver () {
		return new CreateDriver(this.repositoryFactory.createDriverRepository());
	}

	createGetPassenger () {
		return new GetPassenger(this.repositoryFactory.createPassengerRepository());
	}

	createGetDriver () {
		return new GetDriver(this.repositoryFactory.createDriverRepository());
	}

	createCalculateRide () {
		return new CalculateRide();
	}

	createRequestRide () {
		return new RequestRide(this.repositoryFactory.createRideRepository());
	}

	createGetRide () {
		return new GetRide(this.repositoryFactory);
	}

}