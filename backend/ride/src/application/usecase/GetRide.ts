import RideRepository from "../repository/RideRepository";

export default class GetRide {

	constructor (readonly rideRepository: RideRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const ride = await this.rideRepository.get(input.rideId);
		return {
			rideId: ride.rideId,
			driverId: ride.driverId,
			status: ride.status.value,
			requestDate: ride.requestDate,
			acceptDate: ride.acceptDate,
			startDate: ride.startDate,
			endDate: ride.endDate
		}
	}
}

type Input = {
	rideId: string
}

type Output = {
	rideId: string,
	driverId?: string,
	status: string,
	requestDate: Date,
	acceptDate?: Date,
	startDate?: Date,
	endDate?: Date
}
