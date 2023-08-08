import TransactionRepository from "../repository/TransactionRepository";

export default interface RepositoryFactory {
	createTransactionRepository(): TransactionRepository;
}
