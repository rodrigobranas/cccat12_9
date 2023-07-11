import PassengerRepository from "../repository/PassengerRepository";
import Passenger from "../../domain/Passenger";

export default class CreatePassenger {

	constructor (readonly passengerRepository: PassengerRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const passenger = Passenger.create(input.name, input.email, input.document);
		await this.passengerRepository.save(passenger);
		return {
			passengerId: passenger.passengerId
		};
	}
}

type Input = {
	name: string,
	email: string,
	document: string
}

type Output = {
	passengerId: string
}
