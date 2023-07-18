import Ride from "../../src/domain/Ride";

test("Deve fazer o cálculo do preço de uma corrida durante o dia", function () {
	const ride = new Ride();
	ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"));
	ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-01T10:00:00"));
	expect(ride.calculate()).toBe(21);
});

test("Deve fazer o cálculo do preço de uma corrida durante a noite", function () {
	const ride = new Ride();
	ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T23:00:00"));
	ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-01T23:00:00"));
	expect(ride.calculate()).toBe(39);
});

test("Deve fazer o cálculo do preço de uma corrida no domingo de dia", function () {
	const ride = new Ride();
	ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-07T10:00:00"));
	ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-07T10:00:00"));
	expect(ride.calculate()).toBe(29);
});

test("Deve fazer o cálculo do preço de uma corrida no domingo de noite", function () {
	const ride = new Ride();
	ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-07T23:00:00"));
	ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("2021-03-07T23:00:00"));
	expect(ride.calculate()).toBe(50);
});

test("Deve lançar um erro se a data for inválida", function () {
	const ride = new Ride();
	ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("javascript"));
	ride.addPosition(-27.496887588317275, -48.522234807851476, new Date("javascript"));
	expect(() => ride.calculate()).toThrow(new Error("Invalid date"));
});

test("Deve fazer o cálculo do preço de uma corrida durante o dia com preço mínimo", function () {
	const ride = new Ride();
	ride.addPosition(-27.584905257808835, -48.545022195325124, new Date("2021-03-07T23:00:00"));
	ride.addPosition(-27.579020277800876, -48.50838017206791, new Date("2021-03-07T23:00:00"));
	expect(ride.calculate()).toBe(10);
});
