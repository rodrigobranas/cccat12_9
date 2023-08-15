export default interface Password {
	value: string;
	salt: string;
	validate (password: string): boolean;
}
