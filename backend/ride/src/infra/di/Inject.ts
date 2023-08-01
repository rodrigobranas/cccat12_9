import Registry from "./Registry"

export default function inject (name: string) {
	return (target: any, propertyKey: string) => {
		target[propertyKey] = new Proxy({}, {
			get (target: any, propertyKey: string, receiver: any) {
				const dependency = Registry.getInstance().inject(name);
				return dependency[propertyKey];
			}
		});
	}
}
