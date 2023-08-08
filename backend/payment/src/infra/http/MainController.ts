import GetTransaciton from "../../application/usecase/GetTransaction";
import ProcessPayment from "../../application/usecase/ProcessPayment";
import inject from "../di/Inject";
import HttpServer from "./HttpServer";

export default class MainController {
	@inject("processPayment")
	processPayment?: ProcessPayment;
	@inject("getTransaction")
	getTransaction?: GetTransaciton
	
	constructor (httpServer: HttpServer) {
		
		httpServer.on("post", "/process_payment", async (params: any, body: any) => {
			const output = await this.processPayment?.execute(body);
			return output;
		});

		httpServer.on("get", "/transactions/:{transactionId}", async (params: any, body: any) => {
			const output = await this.getTransaction?.execute({ transactionId: params.transactionId });
			return output;
		});
	}
}