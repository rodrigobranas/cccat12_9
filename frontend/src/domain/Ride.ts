import Coord from "./Coord";

export default class Ride {
	rideId: string;
	passengerId: string;
	from: Coord;
	to: Coord;

	constructor (rideId: string, passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number) {
		this.rideId = rideId;
		this.passengerId = passengerId;
		this.from = new Coord(fromLat, fromLong);
		this.to = new Coord(toLat, toLong);
	}

	static create (builder: RideBuilder) {
		return new Ride("", builder.passengerId, builder.fromLat, builder.fromLong, builder.toLat, builder.toLong);
	}
}

export class RideBuilder {
	passengerId = "";
	fromLat = 0;
	fromLong = 0;
	toLat = 0;
	toLong = 0;

	build () {
		return Ride.create(this);
	}
}