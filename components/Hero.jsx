import React from "react";
import {
	Box,
	Button,
	Heading,
	Img,
	Link,
	Stack,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { HiPlay } from "react-icons/hi";
const Hero = () => {
	return (
		<Box as="section" bg={mode("gray.50", "gray.800")} pt="16" pb="24">
			<Box
				maxW={{
					base: "xl",
					md: "7xl",
				}}
				mx="auto"
				px={{
					base: "6",
					md: "8",
				}}
			>
				<Stack
					direction={{
						base: "column",
						lg: "row",
					}}
					spacing={{
						base: "3rem",
						lg: "2rem",
					}}
					mt="8"
					align={{
						lg: "center",
					}}
					justify="space-between"
				>
					<Box
						flex="1"
						maxW={{
							lg: "520px",
						}}
					>
						<Text
							size="xs"
							textTransform="uppercase"
							fontWeight="semibold"
							color={mode("blue.600", "blue.300")}
							letterSpacing="wide"
						>
							Hire Talents
						</Text>
						<Heading
							as="h1"
							size="3xl"
							color={mode("blue.600", "blue.300")}
							mt="8"
							fontWeight="extrabold"
							letterSpacing="tight"
						>
							Cryptoforu NFT Market
						</Heading>
						<Text
							color={mode("gray.600", "gray.400")}
							mt="4"
							fontSize="lg"
							fontWeight="medium"
						>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</Text>
						<Stack
							direction={{
								base: "column",
								md: "row",
							}}
							spacing="4"
							mt="8"
						>
							<Button
								size="lg"
								minW="210px"
								colorScheme="blue"
								height="14"
								px="8"
							>
								Get Started
							</Button>
						</Stack>
					</Box>
					<Box
						pos="relative"
						w={{
							base: "full",
							lg: "560px",
						}}
						h={{
							base: "auto",
							lg: "560px",
						}}
					>
						<Img
							w="full"
							pos="relative"
							zIndex="1"
							h={{
								lg: "100%",
							}}
							objectFit="cover"
							src="/logo.png"
							alt="Cryptoforu"
						/>
					</Box>
				</Stack>
			</Box>
		</Box>
	);
};

export default Hero;
