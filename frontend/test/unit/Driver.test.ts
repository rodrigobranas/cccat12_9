import Driver from "../../src/domain/Driver";

test("Não deve criar um motorista com nome inválido", function () {
	expect(() => new Driver("", "", "", "", "")).toThrow(new Error("Invalid name"));
});

test("Não deve criar um motorista com email inválido", function () {
	expect(() => new Driver("", "John Doe", "", "", "")).toThrow(new Error("Invalid email"));
});

test("Não deve criar um motorista com documento inválido", function () {
	expect(() => new Driver("", "John Doe", "john.doe@gmail.com", "83432616075", "")).toThrow(new Error("Invalid cpf"));
});

test("Não deve criar um motorista com placa do carro inválida", function () {
	expect(() => new Driver("", "John Doe", "john.doe@gmail.com", "83432616074", "AAA999")).toThrow(new Error("Invalid car plate"));
});