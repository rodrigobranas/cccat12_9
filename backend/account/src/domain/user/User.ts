import UUIDGenerator from "../identity/UUIDGenerator";
import Email from "../person/Email";
import PasswordFactory from "./PasswordFactory";
import Password from "./Password";

// Aggregate Root <AR>
// Entity <E>
export default class User {

	private constructor (readonly userId: string, readonly email: Email, readonly password: Password, readonly passwordType: string) {
	}
	
	static create (email: string, password: string, passwordType: string) {
		const userId = UUIDGenerator.create();
		return new User(userId, new Email(email), PasswordFactory.create(passwordType).create(password), passwordType);
	}

	static restore (userId: string, email: string, password: string, passwordType: string, salt: string = "") {
		return new User(userId, new Email(email), PasswordFactory.create(passwordType).restore(password, salt), passwordType);
	}

	validatePassword (password: string) {
		return this.password.validate(password);
	}
}
