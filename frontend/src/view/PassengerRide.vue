<script setup lang="ts">
	import { ref, inject, onMounted } from 'vue';
	import { RideBuilder } from '../domain/Ride';
	import RideGateway from '../infra/gateway/RideGateway';
	import GeoLocation from '../infra/geolocation/GeoLocation';

	const rideBuilder = ref(new RideBuilder());
	const ride = ref();

	const rideGateway = inject("rideGateway") as RideGateway;
	const geoLocation = inject("geoLocation") as GeoLocation;

	async function calculateRide () {
		try {
			ride.value = rideBuilder.value.build();
			ride.value.price = await rideGateway.calculate(ride.value);
		} catch (e: any) {

		}
	}

	async function requestRide () {
		ride.value.rideId = await rideGateway.request(ride.value);
	}

	onMounted(async () => {
		const coord = await geoLocation.getCoord();
		rideBuilder.value.fromLat = coord.lat;
		rideBuilder.value.fromLong = coord.long;
	});
</script>
<template>
	<div>
		<input class="ride-passenger-id" type="text" v-model="rideBuilder.passengerId"/>
		<input class="ride-from-lat" type="text" v-model="rideBuilder.fromLat"/>
		<input class="ride-from-long" type="text" v-model="rideBuilder.fromLong"/>
		<input class="ride-to-lat" type="text" v-model="rideBuilder.toLat"/>
		<input class="ride-to-long" type="text" v-model="rideBuilder.toLong"/>
		<button class="calculate-ride-button" @click="calculateRide()">calculate ride</button>
		<div v-if="ride">
			<div class="ride-price">{{ ride.price }}</div>
			<div class="ride-id">{{ ride.rideId }}</div>
			<button class="request-ride-button" @click="requestRide()">request ride</button>
		</div>
	</div>
</template>
