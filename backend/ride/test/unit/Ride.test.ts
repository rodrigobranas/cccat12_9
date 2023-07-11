
import Ride from "../../src/domain/Ride";

test("Deve fazer o cálculo do preço de uma corrida durante o dia", function () {
	const ride = new Ride();
	ride.addSegment(10, new Date("2021-03-01T10:00:00"));
	expect(ride.calculate()).toBe(21);
});

test("Deve fazer o cálculo do preço de uma corrida durante a noite", function () {
	const ride = new Ride();
	ride.addSegment(10, new Date("2021-03-01T23:00:00"));
	expect(ride.calculate()).toBe(39);
});

test("Deve fazer o cálculo do preço de uma corrida no domingo de dia", function () {
	const ride = new Ride();
	ride.addSegment(10, new Date("2021-03-07T10:00:00"));
	expect(ride.calculate()).toBe(29);
});

test("Deve fazer o cálculo do preço de uma corrida no domingo de noite", function () {
	const ride = new Ride();
	ride.addSegment(10, new Date("2021-03-07T23:00:00"));
	expect(ride.calculate()).toBe(50);
});

test("Deve retornar -1 se a distância for inválida", function () {
	const ride = new Ride();
	expect(() => ride.addSegment(-10, new Date("2023-03-01T10:00:00"))).toThrow(new Error("Invalid distance"));
});

test("Deve retornar -2 se a data for inválida", function () {
	const ride = new Ride();
	expect(() => ride.addSegment(10, new Date("javascript"))).toThrow(new Error("Invalid date"));
});

test("Deve fazer o cálculo do preço de uma corrida durante o dia com preço mínimo", function () {
	const ride = new Ride();
	ride.addSegment(3, new Date("2021-03-01T10:00:00"));
	expect(ride.calculate()).toBe(10);
});

test("Deve fazer o cálculo do preço de uma corrida com múltiplos segmentos", function () {
	const ride = new Ride();
	ride.addSegment(10, new Date("2021-03-01T10:00:00"));
	ride.addSegment(10, new Date("2021-03-01T10:00:00"));
	expect(ride.calculate()).toBe(42);
});
