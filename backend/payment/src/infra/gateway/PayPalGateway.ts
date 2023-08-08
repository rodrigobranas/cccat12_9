import PaymentGateway, { Input, Output } from "../../application/gateway/PaymentGateway";
import crypto from "crypto";

export default class PayPalGateway implements PaymentGateway {

	async createTransaction(input: Input): Promise<Output> {
		// ACL - Anti Corruption Layer
		console.log("PayPal", input);
		return {
			transactionId: crypto.randomUUID()
		}
	}

}