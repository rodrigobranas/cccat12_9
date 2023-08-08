import DriverGateway, { CreateDriverInput } from "./DriverGateway";
import HttpClient from "../http/HttpClient";
import Driver from "../../domain/Driver";

export default class DriverGatewayHttp implements DriverGateway {

	constructor (readonly httpClient: HttpClient) {
	}

	async create (driver: Driver) {
		const input: CreateDriverInput = {
			name: driver.name.getValue(),
			email: driver.email.getValue(),
			document: driver.document.getValue(),
			carPlate: driver.carPlate.getValue()
		}
		const output = await this.httpClient.post("http://localhost:3002/drivers", input);
		return output.driverId;
	}
}