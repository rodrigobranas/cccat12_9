import Ride from "../../domain/Ride";
import HttpClient from "../http/HttpClient";
import RideGateway, { CalculateRideInput, RequestRideInput } from "./RideGateway";

export default class RideGatewayHttp implements RideGateway {
	
	constructor (readonly httpClient: HttpClient) {
	}

	async calculate(ride: Ride): Promise<number> {
		const input: CalculateRideInput = {
			positions: [
				{ lat: ride.from.lat, long: ride.from.long, date: new Date() },
				{ lat: ride.to.lat, long: ride.to.long, date: new Date() }
			]
		};
		const output = await this.httpClient.post("http://localhost:3000/calculate_ride", input);
		return output.price;
	}

	async request(ride: Ride): Promise<string> {
		const input: RequestRideInput = {
			passengerId: ride.passengerId,
			from: {
				lat: ride.from.lat,
				long: ride.from.long
			},
			to: {
				lat: ride.to.lat,
				long: ride.to.long
			},
			date: new Date()
		};
		const output = await this.httpClient.post("http://localhost:3000/request_ride", input);
		return output.rideId;
	}

}
