import Coord from "../../domain/distance/Coord"
import Ride from "../../domain/ride/Ride"
import AccountGatewayHttp from "../../infra/gateway/AccountGatewayHttp";
import PaymentGatewayHttp from "../../infra/gateway/PaymentGatewayHttp";
import AxiosAdapter from "../../infra/http/AxiosAdapter";
import AccountGateway from "../gateway/AccountGateway";
import PaymentGateway from "../gateway/PaymentGateway";
import RideRepository from "../repository/RideRepository";

// Events - RideCompleted
export default class EndRide {

	constructor (
		readonly rideRepository: RideRepository, 
		readonly paymentGateway: PaymentGateway = new PaymentGatewayHttp(new AxiosAdapter()),
		readonly accountGateway: AccountGateway = new AccountGatewayHttp(new AxiosAdapter())
	) {
	}

	async execute (input: Input): Promise<void> {
		const ride = await this.rideRepository.get(input.rideId);
		ride.end(input.date);
		await this.rideRepository.update(ride);
		const amount = ride.calculate();
		const passenger = await this.accountGateway.getPassenger(ride.passengerId);
		const paymentGatewayInput = {
			name: passenger.name,
			email: passenger.email,
			amount
		}
		await this.paymentGateway.process(paymentGatewayInput);
	}
}

type Input = {
	rideId: string,
	date: Date
}
