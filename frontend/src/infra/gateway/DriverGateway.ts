import Driver from "../../domain/Driver";

export default interface DriverGateway {
	save (driver: Driver): Promise<string>;
}