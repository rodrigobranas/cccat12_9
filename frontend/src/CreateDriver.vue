<script setup lang="ts">
	import { inject, ref } from 'vue';
	import DriverGateway from './infra/gateway/DriverGateway';

	const name = ref("");
	const email = ref("");
	const document = ref("");
	const carPlate = ref("");
	const driverId = ref("");

	const driverGateway = inject("driverGateway") as DriverGateway;
	
	async function createDriver () {
		const input = {
			name: name.value,
			email: email.value,
			document: document.value,
			carPlate: carPlate.value
		};
		const output = await driverGateway.save(input);
		driverId.value = output.driverId;
	}
</script>

<template>
	<div>
		<input class="driver-name" v-model="name"/>
		<input class="driver-email" v-model="email"/>
		<input class="driver-document" v-model="document"/>
		<input class="driver-car-plate" v-model="carPlate"/>
		<button class="create-driver-button" @click="createDriver()">create driver</button>
		<div class="driver-id">{{ driverId }}</div>
	</div>
</template>

<style scoped>
</style>
./infra/gateway/DriverGatewayHttp