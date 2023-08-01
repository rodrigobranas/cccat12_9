import RepositoryFactory from "../factory/RepositoryFactory";
import DriverRepository from "../repository/DriverRepository";
import PassengerRepository from "../repository/PassengerRepository";
import RideRepository from "../repository/RideRepository";

export default class GetRide {
	rideRepository: RideRepository;
	passengerRepository: PassengerRepository;
	driverRepository: DriverRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.rideRepository = repositoryFactory.createRideRepository();
		this.passengerRepository = repositoryFactory.createPassengerRepository();
		this.driverRepository = repositoryFactory.createDriverRepository();
	}

	async execute (input: Input): Promise<Output> {
		const ride = await this.rideRepository.get(input.rideId);
		const passenger = await this.passengerRepository.get(ride.passengerId);
		let driver;
		if (ride.driverId) {
			driver = await this.driverRepository.get(ride.driverId);
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
