import Segment from "../../ride/Segment";
import FareCalculatorHandler from "./FareCalculatorHandler";

export default class NormalFareCalculatorHandler extends FareCalculatorHandler {
	FARE = 2.1;

	handle(segment: Segment): number {
		if (!segment.isOvernight() && !segment.isSunday()) {
			return this.calculate(segment);
		}
		if (!this.next) throw new Error("End of chain");
		return this.next.handle(segment);
	}

}
