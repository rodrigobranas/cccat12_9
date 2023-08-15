import TokenGenerator from "../../domain/token/TokenGenerator";
import UserRepository from "../repository/UserRepository";

export default class Login {

	constructor (readonly userRepository: UserRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const user = await this.userRepository.getByEmail(input.email);
		const token = TokenGenerator.create("secret", user.email.value, new Date());
		if (user.validatePassword(input.password)) {
			return {
				token
			}
		}
		throw new Error("Authentication failed");
	}
}

type Input = {
	email: string,
	password: string
}

type Output = {
	token: string
}