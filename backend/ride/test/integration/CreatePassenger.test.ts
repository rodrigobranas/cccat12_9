import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetPassenger from "../../src/application/usecase/GetPassenger";
import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";

test("Deve cadastrar o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074"
	};
	const usecase = new CreatePassenger(new PassengerRepositoryDatabase());
	const output = await usecase.execute(input);
	expect(output.passengerId).toBeDefined();
});

test("Não deve cadastrar o passageiro com email inválido", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail",
		document: "83432616074"
	};
	const usecase = new CreatePassenger(new PassengerRepositoryDatabase());
	await expect(() => usecase.execute(input)).rejects.toThrow(new Error("Invalid email"));
});

test("Deve obter o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074"
	};
	const usecase1 = new CreatePassenger(new PassengerRepositoryDatabase());
	const output1 = await usecase1.execute(input);
	const usecase2 = new GetPassenger(new PassengerRepositoryDatabase());
	const output2 = await usecase2.execute({ passengerId: output1.passengerId });
	expect(output2.name).toBe("John Doe");
	expect(output2.email).toBe("john.doe@gmail.com");
	expect(output2.document).toBe("83432616074");
});
