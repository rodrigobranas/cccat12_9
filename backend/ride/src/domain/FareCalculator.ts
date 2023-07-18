import Segment from "./Segment";

export default interface FareCalculator {
	calculate (segment: Segment): number;
}
