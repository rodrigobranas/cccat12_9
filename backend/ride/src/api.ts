import express from "express";
import CalculateRide from "./application/usecase/CalculateRide";
import CreatePassenger from "./application/usecase/CreatePassenger";
import CreateDriver from "./application/usecase/CreateDriver";
import GetPassenger from "./application/usecase/GetPassenger";
import GetDriver from "./application/usecase/GetDriver";
import DriverRepositoryDatabase from "./infra/repository/DriverRepositoryDatabase";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";

// driver, primary actor, inbound adapter
const app = express();

app.use(express.json());

app.post("/calculate_ride", async function (req, res) {
	try {
		const usecase = new CalculateRide();
		const output = await usecase.execute(req.body);
		res.json(output);
	} catch (e: any) {
		res.status(422).send(e.message);
	}
});

app.post("/passengers", async function (req, res) {
	try {
		const usecase = new CreatePassenger(new PassengerRepositoryDatabase());
		const output = await usecase.execute(req.body);
		res.json(output);
	} catch (e: any) {
		res.status(422).send(e.message);
	}
});

app.get("/passengers/:passengerId", async function (req, res) {
	const usecase = new GetPassenger(new PassengerRepositoryDatabase());
	const output = await usecase.execute({ passengerId: req.params.passengerId });
	res.json(output);
});

app.post("/drivers", async function (req, res) {
	try {
		const usecase = new CreateDriver(new DriverRepositoryDatabase());
		const output = await usecase.execute(req.body);
		res.json(output);
	} catch (e: any) {
		res.status(422).send(e.message);
	}
});

app.get("/drivers/:driverId", async function (req, res) {
	const usecase = new GetDriver(new DriverRepositoryDatabase());
	const output = await usecase.execute({ driverId: req.params.driverId });
	res.json(output);
});

app.listen(3000);
