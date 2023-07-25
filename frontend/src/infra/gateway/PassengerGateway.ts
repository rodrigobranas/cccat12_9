import Passenger from "../domain/passenger/Passenger";

export default interface PassengerGateway {
	save (passenger: Passenger): Promise<string>;
}
