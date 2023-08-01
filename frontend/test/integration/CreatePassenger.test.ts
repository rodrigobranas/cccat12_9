import { mount } from "@vue/test-utils";
import CreatePassengerVue from "../../src/view/CreatePassenger.vue";
import PassengerGatewayHttp from "../../src/infra/gateway/PassengerGatewayHttp";
import AxiosAdapter from "../../src/infra/http/AxiosAdapter";

function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	})
};

test("Deve criar um passageiro", async function () {
	const wrapper = mount(CreatePassengerVue, {
		global: {
			provide: {
				passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".passenger-name").setValue("John Doe");
	await wrapper.get(".passenger-email").setValue("john.doe@gmail.com");
	await wrapper.get(".passenger-document").setValue("83432616074");
	await wrapper.get(".create-passenger-button").trigger("click");
	await sleep(200);
	expect(wrapper.get(".passenger-id").text()).toHaveLength(36);
});

test("Não deve criar um passageiro com nome inválido", async function () {
	const wrapper = mount(CreatePassengerVue, {
		global: {
			provide: {
				passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".passenger-name").setValue("John");
	await wrapper.get(".passenger-email").setValue("john.doe@gmail.com");
	await wrapper.get(".passenger-document").setValue("83432616074");
	await wrapper.get(".create-passenger-button").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Invalid name");
});

test("Não deve criar um passageiro com email inválido", async function () {
	const wrapper = mount(CreatePassengerVue, {
		global: {
			provide: {
				passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".passenger-name").setValue("John Doe");
	await wrapper.get(".passenger-email").setValue("john.doe@gmail");
	await wrapper.get(".passenger-document").setValue("83432616074");
	await wrapper.get(".create-passenger-button").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Invalid email");
});

test("Não deve criar um passageiro com documento inválido", async function () {
	const wrapper = mount(CreatePassengerVue, {
		global: {
			provide: {
				passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".passenger-name").setValue("John Doe");
	await wrapper.get(".passenger-email").setValue("john.doe@gmail.com");
	await wrapper.get(".passenger-document").setValue("83432616075");
	await wrapper.get(".create-passenger-button").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Invalid cpf");
});

test("Deve criar um passageiro tendo errado o preenchimento antes", async function () {
	const wrapper = mount(CreatePassengerVue, {
		global: {
			provide: {
				passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".passenger-name").setValue("John");
	await wrapper.get(".passenger-email").setValue("john.doe@gmail.com");
	await wrapper.get(".passenger-document").setValue("83432616074");
	await wrapper.get(".create-passenger-button").trigger("click");
	await wrapper.get(".passenger-name").setValue("John Doe");
	await wrapper.get(".create-passenger-button").trigger("click");
	await sleep(200);
	expect(wrapper.get(".passenger-id").text()).toHaveLength(36);
	expect(wrapper.get(".error").text()).toBe("");
});
