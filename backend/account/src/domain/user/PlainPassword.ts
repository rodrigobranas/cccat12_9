import Password from "./Password";

export default class PlainPassword implements Password {

	private constructor (readonly value: string, readonly salt: string = "") {
	}

	static create (password: string) {
		return new PlainPassword(password);
	}

	static restore (password: string) {
		return new PlainPassword(password);
	}

	validate (password: string): boolean {
		return this.value === password;
	}
}
