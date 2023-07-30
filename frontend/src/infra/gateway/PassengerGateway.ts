import Passenger from "../../domain/Passenger";

export default interface PassengerGateway {
	save (passenger: Passenger): Promise<string>;
}
