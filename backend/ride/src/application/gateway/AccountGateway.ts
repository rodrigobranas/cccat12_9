export default interface AccountGateway {
	getPassenger (passengerId: string): Promise<Passenger>;
	getDriver (driverId: string): Promise<Driver>
	createPassenger (input: any): Promise<any>;
	createDriver (input: any): Promise<any>
}

export type Passenger = {
	passengerId: string,
	name: string,
	email: string,
	document: string
}

export type Driver = {
	driverId: string,
	name: string,
	email: string,
	document: string,
	carPlate: string
}