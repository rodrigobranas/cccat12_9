import UsecaseFactory from "../../application/factory/UsecaseFactory";
import AcceptRide from "../../application/usecase/AcceptRide";
import CalculateRide from "../../application/usecase/CalculateRide";
import RequestRide from "../../application/usecase/RequestRide";
import inject from "../di/Inject";
import Registry from "../di/Registry";
import HttpServer from "./HttpServer";

// Interface Adapter
export default class MainController {
	@inject("calculateRide")
	calculateRide?: CalculateRide;
	
	constructor (httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
		httpServer.on("post", "/calculate_ride", async (params: any, body: any) => {
			const output = await this.calculateRide?.execute(body);
			return output;
		});

		httpServer.on("post", "/request_ride", async function (params: any, body: any) {
			const output = await usecaseFactory.createRequestRide().execute(body);
			return output;
		});
	}
}
