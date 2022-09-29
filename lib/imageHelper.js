export function imageHelper(image) {
	const imageData = image.replace(/^ipfs:\/\//, "");
	const value = `https://nftstorage.link/ipfs/${imageData}`;

	return value;
}
