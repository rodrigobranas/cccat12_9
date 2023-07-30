import PassengerGateway from "./PassengerGateway";
import HttpClient from "../http/HttpClient";
import Passenger from "../../domain/Passenger";

export default class PassengerGatewayHttp implements PassengerGateway {
	
	constructor (readonly httpClient: HttpClient) {
	}

	async save (passenger: Passenger) {
		const passengerData = await this.httpClient.post("http://localhost:3000/passengers", passenger);
		return passengerData.passengerId;
	}
}