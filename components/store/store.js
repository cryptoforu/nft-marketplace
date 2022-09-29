import create from "zustand";
import { persist } from "zustand/middleware";
import { ethers } from "ethers";
import axios from "axios";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";
import {
	mapCreatedAndOwnedTokenIdsAsMarketItems,
	getUniqueOwnedAndCreatedTokenIds,
	mapAvailableMarketItems,
} from "../../lib/nft";

const networkNames = {
	maticmum: "MUMBAI",
	unknown: "LOCALHOST",
	31337: "LOCALHOST",
	80001: "MUMBAI",
};

const useAppState = create((set, get) => ({
	account: "",
	isAuthenticated: false,
	signer: null,
	signerReady: false,
	isReady: false,
	marketplaceContract: null,
	nftContract: null,
	user: undefined,
	userReady: false,
	tokensOnSale: [],
	ethPrice: "0.0",
	activatingConnector: undefined,
	transaction: undefined,
	fetchingNft: true,
	appError: null,
	currentProvider: null,
	currentExplorer: null,
	web3State: false,
	currentNetwork: null,
	marketItems: {
		fetching: true,
		items: [],
	},
	setSignIn: async (address, chainId, explorer) => {
		try {
			set({
				isAuthenticated: true,
				account: address,
				currentNetwork: chainId,
				currentExplorer: explorer,
			});
			return true;
		} catch (error) {
			set({ appError: error.message });
		}
	},
	setSignOut: async () => {
		try {
			set({ isAuthenticated: false, account: null });
			return true;
		} catch (error) {
			set({ appError: error.message });
		}
	},
	setSigner: (signer) =>
		persist(set({ signer: signer }), {
			name: "signer",
		}),
	setWeb3: async () => {
		try {
			if (!window.ethereum) {
				setCurrentProvider();
				return;
			}
			const { setContractSigner, setMarketItems } = get();
			const network = get().currentNetwork;
			console.log(network);

			const success = await setContractSigner(network);

			const Tokens = await setMarketItems();

			set({
				web3State: success,
				marketItems: { items: Tokens, fetching: false },
			});
		} catch (error) {
			set({ appError: error });
		}
	},
	setContractSigner: async (network) => {
		try {
			const { signer } = get();

			const networkName = networkNames[network];
			const { data } = await axios(`/api/addresses?network=${networkName}`);
			const marketplaceAddress = data.marketplaceAddress;
			const nftAddress = data.nftAddress;
			const marketplaceContract = new ethers.Contract(
				marketplaceAddress,
				Market.abi,
				signer
			);
			const nftContract = new ethers.Contract(nftAddress, NFT.abi, signer);
			set({
				marketplaceContract: marketplaceContract,
				nftContract: nftContract,
				isReady: true,
			});
			return true;
		} catch (e) {
			console.log(e);
		}
	},
	setMarketItems: async () => {
		try {
			const { marketplaceContract, nftContract } = get();
			if (!marketplaceContract && !nftContract)
				throw new Error("No contract found");
			const data = await marketplaceContract.fetchAvailableMarketItems();
			const items = await Promise.all(
				data.map(mapAvailableMarketItems(nftContract))
			);
			return items;
		} catch (e) {
			console.log(e);
			return [];
		}
	},
	setActivating: (activating) => set({ activatingConnector: activating }),
	setIsReady: (ready) => set({ isReady: ready }),
	setCurrentProvider: async () => {
		const provider = new ethers.providers.AlchemyProvider(80001);
		const { setContractProvider } = get();
		await setContractProvider(provider);
	},
	setCurrentNetwork: async (provider) => {
		const { name: network } = await provider.getNetwork();
		const networkName = networkNames[network];
		set({ currentNetwork: networkName });
	},
	setContractProvider: async (provider) => {
		const { setCurrentNetwork } = get();
		await setCurrentNetwork(provider);
		const network = get().currentNetwork;
		const { data } = await axios(`/api/addresses?network=${network}`);
		const marketplaceAddress = data.marketplaceAddress;
		const nftAddress = data.nftAddress;
		const marketplaceContract = new ethers.Contract(
			marketplaceAddress,
			Market.abi,
			provider
		);
		const nftContract = new ethers.Contract(nftAddress, NFT.abi, provider);
		set({
			marketplaceContract: marketplaceContract,
			nftContract: nftContract,
			isReady: true,
		});
	},

	setUser: async (address) => {
		try {
			const { marketplaceContract, nftContract, user, getUserTokens } = get();

			if (!marketplaceContract && !nftContract)
				throw new Error("No contract found");
			if (!user && !address) throw new Error("No user found");

			const ownedTokens = await getUserTokens(address || user?.address);

			set({
				user: {
					address: address || user?.address || "",
					ownedTokens,
				},
				userReady: true,
				fetchingNft: false,
			});
			return true;
		} catch (e) {
			console.log(e);
		}
	},
	getUserTokens: async (address) => {
		try {
			const { marketplaceContract, nftContract, user } = get();

			if (!marketplaceContract && !nftContract)
				throw new Error("No contract found");
			if (!user?.address && !address) throw new Error("No user found");

			const userAddress = user?.address || address;

			const myUniqueCreatedAndOwnedTokenIds =
				await getUniqueOwnedAndCreatedTokenIds(nftContract);
			const myNfts = await Promise.all(
				myUniqueCreatedAndOwnedTokenIds.map(
					mapCreatedAndOwnedTokenIdsAsMarketItems(
						marketplaceContract,
						nftContract,
						userAddress
					)
				)
			);
			return myNfts;
		} catch (e) {
			console.log(e);
			return [];
		}
	},
}));

export { useAppState };
