import Driver from "../../domain/Driver";

export default interface DriverGateway {
	create (driver: Driver): Promise<string>;
}

export type CreateDriverInput = {
	name: string,
	email: string,
	document: string,
	carPlate: string
}
