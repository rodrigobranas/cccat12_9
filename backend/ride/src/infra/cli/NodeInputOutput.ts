import InputOutput from "./InputOutput";

export default class NodeInputOutput extends InputOutput {

	constructor () {
		super();
		process.stdin.on("data", async (chunk) => {
			const command = chunk.toString().replace(/\n/g, "");
			await this.type(command);
		});
	}

	write(text: string): void {
		process.stdout.write(`${text}\n`);
	}

}
