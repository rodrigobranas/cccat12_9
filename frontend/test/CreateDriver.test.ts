import { mount } from "@vue/test-utils";
import CreateDriverVue from "../src/CreateDriver.vue";
import DriverGatewayHttp from "../src/infra/gateway/DriverGatewayHttp";
import DriverGateway from "../src/infra/gateway/DriverGateway";

function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	})
};

test("Deve criar um motorista", async function () {
	const driverGateway: DriverGateway = {
		async save (driver: any): Promise<any> {
			return { driverId: "98846fa9-7c06-4ad8-ac5f-9c96f50406bd" };
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
