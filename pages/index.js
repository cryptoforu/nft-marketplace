import React, { useCallback, useEffect } from "react";
import Head from "next/head";
import { useAppState } from "../components/store/store";
import Hero from "../components/Hero";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import NftFrontCard from "../components/NFT/NftFrontCard";
import Loader from "../components/Loader";
export default function Home() {
	const { marketItems, setWeb3, web3State } = useAppState();

	const market = marketItems.items;
	const fetching = marketItems.fetching;
	const setMarket = useCallback(async () => {
		await setWeb3();
	}, [setWeb3]);
	useEffect(() => {
		if (!fetching) {
			setMarket();
		}
	}, [setMarket, fetching]);

	if (fetching) {
		return <Loader />;
	}
	if (!fetching || web3State) {
		return (
			<>
				<Head>
					<title>Home</title>
				</Head>
				<Hero />
				<Flex w="full" justifyContent={"center"}>
					<SimpleGrid
						columns={{ sm: 2, md: 3 }}
						spacing="20px"
						padding={8}
						justifyContent="center"
					>
						{market.map((nft, i) => (
							<NftFrontCard
								key={i}
								image={nft.image}
								title={nft.name}
								prive={nft.price}
							/>
						))}
					</SimpleGrid>
				</Flex>
			</>
		);
	}
}
