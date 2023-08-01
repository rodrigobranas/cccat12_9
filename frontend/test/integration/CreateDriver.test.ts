import { mount } from "@vue/test-utils";
import CreateDriverVue from "../../src/view/CreateDriver.vue";
import DriverGateway from "../../src/infra/gateway/DriverGateway";

function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	})
};

test("Deve criar um motorista", async function () {
	const driverGateway: DriverGateway = {
		async create (driver: any): Promise<any> {
			return "98846fa9-7c06-4ad8-ac5f-9c96f50406bd";
		}
	};
	const wrapper = mount(CreateDriverVue, {
		global: {
			provide: {
				driverGateway
			}
		}
	});
	await wrapper.get(".driver-name").setValue("John Doe");
	await wrapper.get(".driver-email").setValue("john.doe@gmail.com");
	await wrapper.get(".driver-document").setValue("83432616074");
	await wrapper.get(".driver-car-plate").setValue("AAA9999");
	await wrapper.get(".create-driver-button").trigger("click");
	await sleep(200);
	expect(wrapper.get(".driver-id").text()).toHaveLength(36);
});

test("Não deve criar um motorista com nome inválido", async function () {
	const driverGateway: DriverGateway = {
		async create (driver: any): Promise<any> {
			return "98846fa9-7c06-4ad8-ac5f-9c96f50406bd";
		}
	};
	const wrapper = mount(CreateDriverVue, {
		global: {
			provide: {
				driverGateway
			}
		}
	});
	await wrapper.get(".driver-name").setValue("John");
	await wrapper.get(".driver-email").setValue("john.doe@gmail.com");
	await wrapper.get(".driver-document").setValue("83432616074");
	await wrapper.get(".driver-car-plate").setValue("AAA9999");
	await wrapper.get(".create-driver-button").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Invalid name");
});

test("Não deve criar um motorista com email inválido", async function () {
	const driverGateway: DriverGateway = {
		async create (driver: any): Promise<any> {
			return "98846fa9-7c06-4ad8-ac5f-9c96f50406bd";
		}
	};
	const wrapper = mount(CreateDriverVue, {
		global: {
			provide: {
				driverGateway
			}
		}
	});
	await wrapper.get(".driver-name").setValue("John Doe");
	await wrapper.get(".driver-email").setValue("john.doe@gmail");
	await wrapper.get(".driver-document").setValue("83432616074");
	await wrapper.get(".driver-car-plate").setValue("AAA9999");
	await wrapper.get(".create-driver-button").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Invalid email");
});

test("Não deve criar um motorista com document inválido", async function () {
	const driverGateway: DriverGateway = {
		async create (driver: any): Promise<any> {
			return "98846fa9-7c06-4ad8-ac5f-9c96f50406bd";
		}
	};
	const wrapper = mount(CreateDriverVue, {
		global: {
			provide: {
				driverGateway
			}
		}
	});
	await wrapper.get(".driver-name").setValue("John Doe");
	await wrapper.get(".driver-email").setValue("john.doe@gmail.com");
	await wrapper.get(".driver-document").setValue("83432616075");
	await wrapper.get(".driver-car-plate").setValue("AAA9999");
	await wrapper.get(".create-driver-button").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Invalid cpf");
});

test("Não deve criar um motorista com placa do carro inválida", async function () {
	const driverGateway: DriverGateway = {
		async create (driver: any): Promise<any> {
			return "98846fa9-7c06-4ad8-ac5f-9c96f50406bd";
		}
	};
	const wrapper = mount(CreateDriverVue, {
		global: {
			provide: {
				driverGateway
			}
		}
	});
	await wrapper.get(".driver-name").setValue("John Doe");
	await wrapper.get(".driver-email").setValue("john.doe@gmail.com");
	await wrapper.get(".driver-document").setValue("83432616074");
	await wrapper.get(".driver-car-plate").setValue("AAA999");
	await wrapper.get(".create-driver-button").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Invalid car plate");
});
