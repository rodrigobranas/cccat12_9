import Ride from "../Ride";
import AcceptedRideStatus from "./AcceptedRideStatus";
import RideStatus from "./RideStatus";

export default class RequestedRideStatus extends RideStatus {
	value: string;

	constructor (ride: Ride) {
		super(ride);
		this.value = "requested";
	}

	request(): void {
		throw new Error("Invalid status");
	}

	accept(): void {
		this.ride.status = new AcceptedRideStatus(this.ride);
	}

	start(): void {
		throw new Error("Invalid status");
	}

	end(): void {
		throw new Error("Invalid status");
	}

}