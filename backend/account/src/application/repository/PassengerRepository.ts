import Passenger from "../../domain/passenger/Passenger";

export default interface PassengerRepository {
	save (passenger: Passenger): Promise<void>;
	get (passengerId: string): Promise<Passenger>;
}
