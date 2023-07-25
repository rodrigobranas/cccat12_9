import RideRepository from "../../application/repository/RideRepository";
import Coord from "../../domain/distance/Coord";
import Ride from "../../domain/ride/Ride";
import DatabaseConnection from "../database/DatabaseConnection";

export default class RideRepositoryDatabase implements RideRepository {

	constructor (readonly connection: DatabaseConnection) {
	}

	async save(ride: Ride): Promise<void> {
		await this.connection.query("insert into cccat12.ride (ride_id, passenger_id, from_lat, from_long, to_lat, to_long, status, request_date) values ($1, $2, $3, $4, $5, $6, $7, $8)", [ride.rideId, ride.passengerId, ride.from.lat, ride.from.long, ride.to.lat, ride.to.long, ride.status.value, ride.requestDate]);
	}

	async get(rideId: string): Promise<Ride> {
		const [rideData] = await this.connection.query("select * from cccat12.ride where ride_id = $1", [rideId]);
		const ride = new Ride(rideData.ride_id, rideData.passenger_id, new Coord(parseFloat(rideData.from_lat), parseFloat(rideData.from_long)), new Coord(parseFloat(rideData.to_lat), parseFloat(rideData.to_long)),rideData.status, rideData.request_date);
		ride.driverId = rideData.driver_id;
		ride.acceptDate = rideData.accept_date;
		ride.startDate = rideData.start_date;
		ride.endDate = rideData.end_date;
		return ride;
	}

	async update(ride: Ride): Promise<void> {
		await this.connection.query("update cccat12.ride set driver_id = $1, status = $2, accept_date = $3, start_date = $4, end_date = $5 where ride_id = $6", [ride.driverId, ride.status.value, ride.acceptDate, ride.startDate, ride.endDate, ride.rideId]);
	}

}