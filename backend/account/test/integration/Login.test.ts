import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetPassenger from "../../src/application/usecase/GetPassenger";
import GetSession from "../../src/application/usecase/GetSession";
import Login from "../../src/application/usecase/Login";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";
import UserRepositoryDatabase from "../../src/infra/repository/UserRepositoryDatabase";

test("Deve fazer o login", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074",
		password: "123456"
	};
	const connection = new PgPromiseAdapter();
	const createPassenger = new CreatePassenger(new PassengerRepositoryDatabase(connection), new UserRepositoryDatabase(connection));
	await createPassenger.execute(input);
	const login = new Login(new UserRepositoryDatabase(connection));
	const inputLogin = {
		email: "john.doe@gmail.com",
		password: "123456"
	}
	const outputLogin = await login.execute(inputLogin);
	expect(outputLogin.token).toBeDefined();
	console.log(outputLogin.token);
	await connection.close();
});

test("Deve fazer o login e validar se o usuário está logado", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074",
		password: "123456"
	};
	const connection = new PgPromiseAdapter();
	const createPassenger = new CreatePassenger(new PassengerRepositoryDatabase(connection), new UserRepositoryDatabase(connection));
	await createPassenger.execute(input);
	const login = new Login(new UserRepositoryDatabase(connection));
	const inputLogin = {
		email: "john.doe@gmail.com",
		password: "123456"
	}
	const outputLogin = await login.execute(inputLogin);

	const getSession = new GetSession();
	const outputGetSession = await getSession.execute({ token: outputLogin.token });
	expect(outputGetSession.email).toBe("john.doe@gmail.com");
	await connection.close();
});
