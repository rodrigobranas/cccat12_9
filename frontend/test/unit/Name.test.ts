import Name from "../../src/domain/Name";

test("Deve criar um nome válido", function () {
	const name = new Name("John Doe");
	expect(name.getValue()).toBe("John Doe");
});

test("Não deve criar um nome inválido", function () {
	expect(() => new Name("John")).toThrow(new Error("Invalid name"));
});
