import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PassengerGatewayHttp from "./infra/gateway/PassengerGatewaHttp";
import DriverGatewayHttp from "./infra/gateway/DriverGatewayHttp";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import FetchAdapter from "./infra/http/FetchAdapter";

const app = createApp(App);
// const httpClient = new AxiosAdapter();
const httpClient = new FetchAdapter();
app.provide("passengerGateway", new PassengerGatewayHttp(httpClient));
app.provide("driverGateway", new DriverGatewayHttp(httpClient));
app.mount("#app");
