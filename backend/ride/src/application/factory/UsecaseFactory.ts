import CalculateRide from "../usecase/CalculateRide";
import GetRide from "../usecase/GetRide";
import RequestRide from "../usecase/RequestRide";
import RepositoryFactory from "./RepositoryFactory";

export default class UsecaseFactory {

	constructor (readonly repositoryFactory: RepositoryFactory) {
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