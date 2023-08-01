export default class Name {
	private value: string;

	constructor (name: string) {
		if (!this.validate(name)) throw new Error("Invalid name");
		this.value = name;
	}

	validate (name: string) {
		return String(name)
			.toLowerCase()
			.match(/^[a-z]+\s([a-z]+){1,}$/);
	}

	getValue () {
		return this.value;
	}
}