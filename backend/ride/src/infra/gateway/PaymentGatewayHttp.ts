import PaymentGateway, { Input } from "../../application/gateway/PaymentGateway";
import HttpClient from "../http/HttpClient";

export default class PaymentGatewayHttp implements PaymentGateway {

	constructor (readonly httpClient: HttpClient) {
	}

	async process(input: Input): Promise<void> {
		await this.httpClient.post("http://localhost:3001/process_payment", input);
	}

}
