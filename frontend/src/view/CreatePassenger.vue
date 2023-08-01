<script setup lang="ts">
	import { inject, ref } from 'vue';
	import PassengerGateway from '../infra/gateway/PassengerGateway';
	import { PassengerBuilder } from '../domain/Passenger';

	const passengerBuilder = ref(new PassengerBuilder());
	const passenger = ref();
	const error = ref("");

	const passengerGateway = inject("passengerGateway") as PassengerGateway;

	async function createPassenger () {
		try {
			error.value = "";
			passenger.value = passengerBuilder.value.build();
			passenger.value.passengerId = await passengerGateway.create(passenger.value);
		} catch (e: any) {
			error.value = e.message;
		}
	}
</script>

<template>
	<div>
		<input class="passenger-name" v-model="passengerBuilder.name"/>
		<input class="passenger-email" v-model="passengerBuilder.email"/>
		<input class="passenger-document" v-model="passengerBuilder.document"/>
		<button class="create-passenger-button" @click="createPassenger()">create passenger</button>
		<div class="error">{{ error }}</div>
		<div v-if="passenger">
			<div class="passenger-id">{{ passenger.passengerId }}</div>
		</div>
	</div>
</template>

<style scoped>
</style>