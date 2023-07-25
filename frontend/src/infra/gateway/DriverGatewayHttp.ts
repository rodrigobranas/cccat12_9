import DriverGateway from "./DriverGateway";
import HttpClient from "../http/HttpClient";

export default class DriverGatewayHttp implements DriverGateway {

	constructor (readonly httpClient: HttpClient) {
	}

	async save (driver: any) {
		return await this.httpClient.post("http://localhost:3000/drivers", driver);
	}
}