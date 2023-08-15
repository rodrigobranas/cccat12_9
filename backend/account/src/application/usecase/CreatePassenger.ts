import PassengerRepository from "../repository/PassengerRepository";
import Passenger from "../../domain/passenger/Passenger";
import User from "../../domain/user/User";
import UserRepository from "../repository/UserRepository";

export default class CreatePassenger {

	constructor (readonly passengerRepository: PassengerRepository, readonly userRepository: UserRepository) {
	}

	// unit of work
	// operações de compensação - SAGA
	async execute (input: Input): Promise<Output> {
		const passenger = Passenger.create(input.name, input.email, input.document);
		await this.passengerRepository.save(passenger);
		if (input.password) {
			const user = User.create(input.email, input.password, "pbkdf2");
			await this.userRepository.save(user);
		}
		return {
			passengerId: passenger.passengerId
		};
	}
}

type Input = {
	name: string,
	email: string,
	document: string,
	password?: string
}

type Output = {
	passengerId: string
}
