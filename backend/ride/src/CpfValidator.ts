function clean (cpf: string) {
	return cpf.replace(/\D/g, "");
}

function isValidLength (cpf: string) {
	return cpf.length !== 11;
}

function hasAllDigitsEqual (cpf: string) {
	const [firstDigit] = cpf;
	return [...cpf].every(digit => digit === firstDigit);
}

function extractCheckDigit (cpf: string) {
	return cpf.slice(9);
}

function calculateDigit (cpf: string, factor: number) {
	let total = 0;
	for (const digit of cpf) {
		if (factor > 1) total += parseInt(digit) * factor--;
	}
	const rest = total%11;
	return (rest < 2) ? 0 : 11 - rest;
}

export function validate (cpf: string) {
	cpf = clean(cpf);
	if (isValidLength(cpf)) return false;  
	if (hasAllDigitsEqual(cpf)) return false;
	const dg1 = calculateDigit(cpf, 10);
	const dg2 = calculateDigit(cpf, 11);
	return extractCheckDigit(cpf) == `${dg1}${dg2}`;
}
