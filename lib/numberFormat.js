export function forNumber(value, decimals) {
	let num = value;
	return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
