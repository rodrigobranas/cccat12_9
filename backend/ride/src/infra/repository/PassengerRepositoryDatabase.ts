import pgp from "pg-promise";
import PassengerRepository from "../../application/repository/PassengerRepository";
import Passenger from "../../domain/Passenger";

export default class PassengerRepositoryDatabase implements PassengerRepository {

	async save (passenger: Passenger) {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		await connection.query("insert into cccat12.passenger (passenger_id, name, email, document) values ($1, $2, $3, $4)", [passenger.passengerId, passenger.name, passenger.email.value, passenger.document.value]);
		await connection.$pool.end();
	}

	async get (passengerId: string): Promise<Passenger> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [passengerData] = await connection.query("select * from cccat12.passenger where passenger_id = $1", [passengerId]);
		await connection.$pool.end();
		return new Passenger(passengerData.passenger_id, passengerData.name, passengerData.email, passengerData.document);
	}
}