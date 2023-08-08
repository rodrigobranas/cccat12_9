import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
};

test("Deve processar um pagamento", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		amount: 30
	};
	const response1 = await axios.post("http://localhost:3001/process_payment", input);
	const processPaymentOutput = response1.data;
	const response2 = await axios.get(`http://localhost:3001/transactions/${processPaymentOutput.transactionId}`);
	const getTransactionOutput = response2.data;
	expect(getTransactionOutput.name).toBe("John Doe");
});
