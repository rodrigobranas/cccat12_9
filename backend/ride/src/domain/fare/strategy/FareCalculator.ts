import Segment from "../../ride/Segment";

export default interface FareCalculator {
	calculate (segment: Segment): number;
}
