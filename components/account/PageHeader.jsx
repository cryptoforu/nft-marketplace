import {
	Box,
	Button,
	HStack,
	Stack,
	Link,
	useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { HiCheck, HiCurrencyDollar, HiPencil } from "react-icons/hi";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { UserBalance } from "./UserBalance";

const PageHeader = ({ address, balance, symbol, isLoading, href }) => {
	return (
		<Box p="8">
			<Box
				maxW="7xl"
				mx="auto"
				p="8"
				rounded={"lg"}
				shadow={"lg"}
				bg={useColorModeValue("gray.300", "black")}
			>
				<Stack
					spacing={{
						base: "8",
						md: "4",
					}}
					direction={{
						base: "column",
						lg: "row",
					}}
					justify="space-between"
					align="flex-start"
				>
					<Stack
						direction="row"
						flex="1"
						spacing="6"
						align={{
							base: "flex-start",
							md: "center",
						}}
					>
						<Box flex="1">
							<HStack
								mb={{
									base: "3",
									md: "1",
								}}
							>
								<Link href={href} isExternal>
									{address} <ExternalLinkIcon mx="2px" />
								</Link>
							</HStack>
							<Stack
								direction={{
									base: "column",
									md: "row",
								}}
								spacing={{
									base: "3",
									lg: "6",
								}}
							>
								<UserBalance
									icon={<HiCurrencyDollar />}
									balance={balance}
									symbol={symbol}
									isLoading={isLoading}
								/>
							</Stack>
						</Box>
					</Stack>
					<HStack spacing="4">
						<Button
							variant="outline"
							leftIcon={<Box as={HiPencil} fontSize="lg" />}
						>
							NFTs
						</Button>
						<Button
							colorScheme="blue"
							leftIcon={<Box as={HiCheck} fontSize="lg" />}
						>
							Mint NFT
						</Button>
					</HStack>
				</Stack>
			</Box>
		</Box>
	);
};
export default PageHeader;
