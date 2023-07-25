import Ride from "../Ride";
import CompletedRideStatus from "./CompletedRideStatus";
import RideStatus from "./RideStatus";

export default class InProgressRideStatus extends RideStatus {
	value: string;

	constructor (ride: Ride) {
		super(ride);
		this.value = "in_progress";
	}

	request(): void {
		throw new Error("Invalid status");
	}

	accept(): void {
		throw new Error("Invalid status");
	}

	start(): void {
		throw new Error("Invalid status");
	}

	end(): void {
		this.ride.status = new CompletedRideStatus(this.ride);
	}

}