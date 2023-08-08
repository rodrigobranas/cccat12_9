import Transaction from "../../domain/transaction/Transaction";
import PaymentGateway from "../gateway/PaymentGateway";
import TransactionRepository from "../repository/TransactionRepository";

export default class GetTransaciton {

	constructor (
		readonly transactionRepository: TransactionRepository
	) {
	}

	async execute (input: Input): Promise<Output> {
		const transaction = await this.transactionRepository.get(input.transactionId);
		return {
			transactionId: transaction.transactionId,
			name: transaction.name,
			email: transaction.email,
			amount: transaction.amount
		}
	}
}

type Input = {
	transactionId: string
}

type Output = {
	transactionId: string,
	name: string,
	email: string,
	amount: number
}
