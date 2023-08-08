export default interface PaymentGateway {
	process (input: Input): Promise<void>;
}

export type Input = {
	name: string,
	email: string,
	amount: number
}
