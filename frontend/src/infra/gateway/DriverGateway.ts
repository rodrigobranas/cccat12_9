export default interface DriverGateway {
	save (driver: any): Promise<any>;
}