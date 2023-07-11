import crypto from "crypto";
import Cpf from "./Cpf";
import Email from "./Email";
import UUIDGenerator from "./UUIDGenerator";
import CarPlate from "./CarPlate";

export default class Driver {
	document: Cpf;
	email: Email;
	carPlate: CarPlate;

	constructor (readonly driverId: string, readonly name: string, email: string, document: string, carPlate: string) {		
		this.document = new Cpf(document);
		this.email = new Email(email);
		this.carPlate = new CarPlate(carPlate);
	}
	
	static create (name: string, email: string, document: string, carPlate: string) {
		const driverId = UUIDGenerator.create();
		return new Driver(driverId, name, email, document, carPlate);
	}

}
