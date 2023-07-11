import DriverRepository from "../repository/DriverRepository";
import Driver from "../../domain/Driver";

// Application
export default class CreateDriver {

	constructor (readonly driverRepository: DriverRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const driver = Driver.create(input.name, input.email, input.document, input.carPlate);
		await this.driverRepository.save(driver);
		return {
			driverId: driver.driverId
		};
	}
}

// DTO - Data Transfer Object
type Input = {
	name: string,
	email: string,
	document: string
	carPlate: string
}

// DTO - Data Transfer Object
type Output = {
	driverId: string
}
