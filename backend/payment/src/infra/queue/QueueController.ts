import ProcessPayment from "../../application/usecase/ProcessPayment";
import inject from "../di/Inject";
import Queue from "./Queue";

export default class QueueController {
	@inject("processPayment")
	processPayment?: ProcessPayment;

	constructor (readonly queue: Queue) {
		queue.consume("rideCompleted", async (input: any) => {
			await this.processPayment?.execute(input);
		});
	}
}
