import Transaction from "../../domain/transaction/Transaction";

export default interface TransactionRepository {
	save (transaction: Transaction): Promise<void>;
	get (transactionId: string): Promise<Transaction>;
}
