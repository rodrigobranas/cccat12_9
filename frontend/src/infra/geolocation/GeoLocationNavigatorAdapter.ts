import Coord from "../../domain/Coord";
import GeoLocation from "./GeoLocation";

export default class GeoLocationNavigatorAdapter implements GeoLocation {

	async getCoord(): Promise<Coord> {
		return new Promise((resolve) => {
			navigator.geolocation.getCurrentPosition(function (position: any) {
				resolve(new Coord(position.coords.latitude, position.coords.longitude));
			});
		});
	}

}
