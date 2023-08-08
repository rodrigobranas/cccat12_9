export default class Transaction {

	constructor (readonly transactionId: string, readonly name: string, readonly email: string, readonly amount: number) {
	}
}
