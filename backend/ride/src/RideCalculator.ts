// @ts-nocheck
function isOvernight (segment) {
	return segment.date.getHours() >= 22 || segment.date.getHours() <= 6;
}

function isSunday (segment) {
	return segment.date.getDay() === 0;
}

function isValidDistance (segment) {
	return segment.distance != null && segment.distance != undefined && typeof segment.distance === "number" && segment.distance > 0;
}

function isValidDate (segment) {
	return segment.date != null && segment.date != undefined && segment.date instanceof Date && segment.date.toString() !== "Invalid Date";
}

export function calculate (segments) {
	let price = 0;
	for (const segment of segments) {
		segment.date = new Date(segment.date);
		if (!isValidDistance(segment)) return -1;
		if (!isValidDate(segment)) return -2;
		if (isOvernight(segment) && !isSunday(segment)) {
			price += segment.distance * 3.90;
		}
		if (isOvernight(segment) && isSunday(segment)) {
			price += segment.distance * 5;
		}
		if (!isOvernight(segment) && isSunday(segment)) {
			price += segment.distance * 2.9;
		}
		if (!isOvernight(segment) && !isSunday(segment)) {
			price += segment.distance * 2.10;
		}
	}
	price = (price < 10) ? 10 : price;
	return price;
}
