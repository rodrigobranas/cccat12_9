import PassengerRepository from "../repository/PassengerRepository";
import UserRepository from "../repository/UserRepository";

export default class GetPassenger {

	constructor (readonly passengerRepository: PassengerRepository, readonly userRepository: UserRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const passenger = await this.passengerRepository.get(input.passengerId);
		const user = await this.userRepository.getByEmail(passenger.email.value);
		return {
			passengerId: passenger.passengerId,
			name: passenger.name,
			email: passenger.email.value,
			document: passenger.document.value,
			userId: user.userId
		}
	}
}

type Input = {
	passengerId: string
}

// DTO - flat
type Output = {
	passengerId: string,
	name: string,
	email: string,
	document: string,
	userId: string
}
