import CalculateRide from "../../src/application/usecase/CalculateRide";

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
	const input = {
		positions: [
			{ lat: -27.584905257808835, long: -48.545022195325124, date: new Date("2021-03-01T10:00:00") },
			{ lat: -27.496887588317275, long: -48.522234807851476, date: new Date("2021-03-01T10:00:00") }
		]
	};
	const usecase = new CalculateRide();
	const output = await usecase.execute(input);
	expect(output.price).toBe(21);
});