import Coord from "../../domain/distance/Coord";
import Ride from "../../domain/ride/Ride";

export default class CalculateRide {

	constructor () {
	}

	async execute (input: Input): Promise<Output> {
		const ride = Ride.create("", new Coord(0,0), new Coord(0,0));
		for (const position of input.positions) {
			ride.addPosition(position.lat, position.long, new Date(position.date));
		}
		const price = ride.calculate();
		return { 
			price 
		};
	}
}

type Input = {
	positions: { lat: number, long: number, date: Date }[]
}

type Output = {
	price: number
}
