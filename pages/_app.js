import "@rainbow-me/rainbowkit/styles.css";
import {
	getDefaultWallets,
	RainbowKitProvider,
	darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const hardhatChain = {
	id: 31337,
	name: "Hardhat",
	nativeCurrency: {
		decimals: 18,
		name: "Hardhat",
		symbol: "HARD",
	},
	network: "hardhat",
	rpcUrls: {
		default: "http://127.0.0.1:8545",
	},
	testnet: true,
};

const { provider, chains } = configureChains(
	[
		hardhatChain,
		chain.polygonMumbai,

		chain.goerli,
		chain.mainnet,
		chain.polygon,
		chain.optimism,
		chain.arbitrum,
	],
	[alchemyProvider({ apiKey: alchemyId }), publicProvider()]
);
const { connectors } = getDefaultWallets({
	appName: "My RainbowKit App",
	chains,
});
const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains} theme={darkTheme()}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</RainbowKitProvider>
			</WagmiConfig>
		</ChakraProvider>
	);
}

export default MyApp;
