<script setup lang="ts">
	import { inject, ref } from 'vue';
	import PassengerGateway from './infra/gateway/PassengerGateway';
	import Passenger from './domain/Passenger';

	const passenger = ref(new Passenger());
	const passengerId = ref("");

	const passengerGateway = inject("passengerGateway") as PassengerGateway;

	async function createPassenger () {
		passengerId.value = await passengerGateway.save(passenger.value);
	}
</script>

<template>
	<div>
		<input class="passenger-name" v-model="passenger.name"/>
		<input class="passenger-email" v-model="passenger.email"/>
		<input class="passenger-document" v-model="passenger.document"/>
		<button class="create-passenger-button" @click="createPassenger()">create passenger</button>
		<div class="passenger-id">{{ passengerId }}</div>
	</div>
</template>

<style scoped>
</style>