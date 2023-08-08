import PassengerGateway, { CreatePassengerInput } from "./PassengerGateway";
import HttpClient from "../http/HttpClient";
import Passenger from "../../domain/Passenger";

export default class PassengerGatewayHttp implements PassengerGateway {
	
	constructor (readonly httpClient: HttpClient) {
	}

	async create (passenger: Passenger) {
		const input: CreatePassengerInput = {
			name: passenger.name.getValue(),
			email: passenger.email.getValue(),
			document: passenger.document.getValue()
		};
		const passengerData = await this.httpClient.post("http://localhost:3002/passengers", input);
		return passengerData.passengerId;
	}
}