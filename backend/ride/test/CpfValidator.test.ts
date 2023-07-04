import { validate } from "../src/CpfValidator";

test.each([
	"83432616074",
	"74587887803",
	"87175659520"
])("Deve testar os cpfs válidos", function (cpf: string) {
	const isValid = validate(cpf);
	expect(isValid).toBeTruthy();
});

test.each([
	"83432616076",
	"99999999999",
	"834326160",
	""
])("Deve testar os cpfs inválidos", function (cpf: string) {
	const isValid = validate(cpf);
	expect(isValid).toBeFalsy();
});
