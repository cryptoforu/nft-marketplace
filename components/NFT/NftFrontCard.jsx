import React from "react";
import {
	Box,
	Center,
	useColorModeValue,
	Heading,
	Text,
	Stack,
	Icon,
	Image,
	Flex,
} from "@chakra-ui/react";
import { SiEthereum } from "react-icons/si";
import { imageHelper } from "../../lib/imageHelper";

const NftFrontCard = (props) => {
	return (
		<Center py={12}>
			<Box
				role={"group"}
				p={6}
				maxW={"330px"}
				w={"full"}
				bg={useColorModeValue("gray.300", "black")}
				boxShadow={"2xl"}
				rounded={"lg"}
				pos={"relative"}
				zIndex={1}
			>
				<Box
					rounded={"lg"}
					pos={"relative"}
					height={"230px"}
					_groupHover={{
						_after: {
							filter: "blur(20px)",
						},
					}}
				>
					<Image
						rounded={"lg"}
						height={230}
						width={282}
						objectFit={"cover"}
						src={props.image}
						alt={props.alt}
					/>
				</Box>
				<Stack pt={10} align={"center"}>
					<Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
						{props.collection}
					</Text>
					<Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
						{props.title}
					</Heading>
					<Flex flexDirection={"row"} alignItems={"center"} gap="2">
						{props.price && (
							<>
								<Icon as={SiEthereum} w={6} h={6} color="blue.400" />
								<Text fontWeight={800} fontSize={"xl"}>
									{props.price}
								</Text>
							</>
						)}
					</Flex>
				</Stack>
			</Box>
		</Center>
	);
};

export default NftFrontCard;
