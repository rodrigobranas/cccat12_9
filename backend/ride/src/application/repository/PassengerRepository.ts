import Passenger from "../../domain/Passenger";

export default interface PassengerRepository {
	save (passenger: Passenger): Promise<void>;
	get (passengerId: string): Promise<Passenger>;
}
