import Passenger from "../../src/domain/Passenger";

test("Não deve criar um passageiro inválido", function () {
	expect(() => new Passenger("", "", "", "")).toThrow(new Error("Invalid name"));
});