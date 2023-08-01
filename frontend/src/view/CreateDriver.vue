<script setup lang="ts">
	import { inject, ref } from 'vue';
	import DriverGateway from '../infra/gateway/DriverGateway';
	import { DriverBuilder } from '../domain/Driver';

	const driverBuilder = ref(new DriverBuilder());
	const driver = ref();
	const error = ref("");

	const driverGateway = inject("driverGateway") as DriverGateway;
	
	async function createDriver () {
		try {
			error.value = "";
			driver.value = driverBuilder.value.build(); 
			driver.value.driverId = await driverGateway.create(driver.value);
		} catch (e: any) {
			error.value = e.message;
		}
	}
</script>

<template>
	<div>
		<input class="driver-name" v-model="driverBuilder.name"/>
		<input class="driver-email" v-model="driverBuilder.email"/>
		<input class="driver-document" v-model="driverBuilder.document"/>
		<input class="driver-car-plate" v-model="driverBuilder.carPlate"/>
		<button class="create-driver-button" @click="createDriver()">create driver</button>
		<div class="error">{{ error }}</div>
		<div v-if="driver">
			<div class="driver-id">{{ driver.driverId }}</div>
		</div>
	</div>
</template>

<style scoped>
</style>