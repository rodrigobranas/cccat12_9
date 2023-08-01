import Coord from "../../domain/Coord";

export default interface GeoLocation {
	getCoord (): Promise<Coord>;
}
