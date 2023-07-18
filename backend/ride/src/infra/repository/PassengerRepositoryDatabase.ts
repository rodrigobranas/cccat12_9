import PassengerRepository from "../../application/repository/PassengerRepository";
import Passenger from "../../domain/Passenger";
import DatabaseConnection from "../database/DatabaseConnection";

// Interface Adapters
export default class PassengerRepositoryDatabase implements PassengerRepository {

	constructor (readonly connection: DatabaseConnection) {
	}
	
	async save (passenger: Passenger) {
		await this.connection.query("insert into cccat12.passenger (passenger_id, name, email, document) values ($1, $2, $3, $4)", [passenger.passengerId, passenger.name, passenger.email.value, passenger.document.value]);
	}

	async get (passengerId: string): Promise<Passenger> {
		const [passengerData] = await this.connection.query("select * from cccat12.passenger where passenger_id = $1", [passengerId]);
		return new Passenger(passengerData.passenger_id, passengerData.name, passengerData.email, passengerData.document);
	}
}