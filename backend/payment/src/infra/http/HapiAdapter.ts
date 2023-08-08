import HttpServer from "./HttpServer";
import Hapi from "@hapi/hapi";

export default class HapiAdapter implements HttpServer {
	server: Hapi.Server;

	constructor () {
		this.server = Hapi.server({});
	}

	on(method: string, url: string, callback: Function): void {
		this.server.route({
			method,
			path: url.replace(/\:/g, ""),
			handler: async function (request: any, reply: any) {
				try {
					const output = await callback(request.params, request.payload)
					return output;
				} catch (e: any) {
					return reply.response(e.message).code(422);
				}
			}
		})
	}

	listen(port: number): void {
		this.server.settings.port = port;
		this.server.start();
	}

}