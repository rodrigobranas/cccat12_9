import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
};

// broad integration test

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
	const input = {
		positions: [
			{ lat: -27.584905257808835, long: -48.545022195325124, date: new Date("2021-03-01T10:00:00") },
			{ lat: -27.496887588317275, long: -48.522234807851476, date: new Date("2021-03-01T10:00:00") }
		]
	};
	const response = await axios.post("http://localhost:3000/calculate_ride", input);
	const output = response.data;
	expect(output.price).toBe(21);
});

test("Se a data for inválida deve lançar um erro", async function () {
	const input = {
		positions: [
			{ lat: -27.584905257808835, long: -48.545022195325124, date: "javascript" },
			{ lat: -27.496887588317275, long: -48.522234807851476, date: "javascript" }
		]
	};
	const response = await axios.post("http://localhost:3000/calculate_ride", input);
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output).toBe("Invalid date");
});

test("Deve cadastrar o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074"
	};
	const response1 = await axios.post("http://localhost:3000/passengers", input);
	const output1 = response1.data;
	expect(output1.passengerId).toBeDefined();
});

test("Não deve cadastrar o passageiro com cpf inválido", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616076"
	};
	const response = await axios.post("http://localhost:3000/passengers", input);
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output).toBe("Invalid cpf");
});

test("Deve obter o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074"
	};
	const response1 = await axios.post("http://localhost:3000/passengers", input);
	const output1 = response1.data;
	const response2 = await axios.get(`http://localhost:3000/passengers/${output1.passengerId}`);
	const output2 = response2.data;
	expect(output2.name).toBe("John Doe");
	expect(output2.email).toBe("john.doe@gmail.com");
	expect(output2.document).toBe("83432616074");
});

test("Deve cadastrar o motorista", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074",
		carPlate: "AAA9999"
	};
	const response1 = await axios.post("http://localhost:3000/drivers", input);
	const output1 = response1.data;
	expect(output1.driverId).toBeDefined();
});

test("Não deve cadastrar o motorista com cpf inválido", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616076",
		carPlate: "AAA9999"
	};
	const response = await axios.post("http://localhost:3000/drivers", input);
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output).toBe("Invalid cpf");
});

test("Deve obter o motorista", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074",
		carPlate: "AAA9999"
	};
	const response1 = await axios.post("http://localhost:3000/drivers", input);
	const output1 = response1.data;
	const response2 = await axios.get(`http://localhost:3000/drivers/${output1.driverId}`);
	const output2 = response2.data;
	expect(output2.name).toBe("John Doe");
	expect(output2.email).toBe("john.doe@gmail.com");
	expect(output2.document).toBe("83432616074");
	expect(output2.carPlate).toBe("AAA9999");
});