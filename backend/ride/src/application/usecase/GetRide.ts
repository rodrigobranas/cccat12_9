import AccountGatewayHttp from "../../infra/gateway/AccountGatewayHttp";
import AxiosAdapter from "../../infra/http/AxiosAdapter";
import RepositoryFactory from "../factory/RepositoryFactory";
import AccountGateway from "../gateway/AccountGateway";
import RideRepository from "../repository/RideRepository";

// CQRS - Command Query Responsibility Segregation
export default class GetRide {
	rideRepository: RideRepository;

	constructor (
		readonly repositoryFactory: RepositoryFactory, 
		readonly accountGateway: AccountGateway = new AccountGatewayHttp(new AxiosAdapter())
	) {
		this.rideRepository = repositoryFactory.createRideRepository();
	}

	async execute (input: Input): Promise<Output> {
		const ride = await this.rideRepository.get(input.rideId);
		const passenger = await this.accountGateway.getPassenger(ride.passengerId);
		let driver;
		if (ride.driverId) {
			driver = await this.accountGateway.getDriver(ride.driverId);
		}
		return {
			rideId: ride.rideId,
			driverId: ride.driverId,
			passengerId: ride.passengerId,
			status: ride.status.value,
			requestDate: ride.requestDate,
			acceptDate: ride.acceptDate,
			startDate: ride.startDate,
			endDate: ride.endDate,
			passengerName: passenger.name,
			driverName: driver?.name
		}
	}
}

type Input = {
	rideId: string
}

// adicionar o transactionId
type Output = {
	rideId: string,
	driverId?: string,
	passengerId: string,
	status: string,
	requestDate: Date,
	acceptDate?: Date,
	startDate?: Date,
	endDate?: Date,
	passengerName: string,
	driverName?: string
}
