import React, { isValidElement } from "react";
import {
	Divider,
	Flex,
	HStack,
	IconButton,
	Spacer,
	Stack,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { MobileNavContent } from "./MobileNavContent";
import ConnectWallet from "./ConnectWallet";
import { useAppState } from "../store/store";
export const Template = (props) => {
	const children = React.Children.toArray(props.children).filter(
		isValidElement
	);
	const mobileNav = useDisclosure();
	const { isAuthenticated } = useAppState();
	return (
		<Flex
			py={4}
			px={{
				base: 4,
				md: 6,
				lg: 8,
			}}
			bg={useColorModeValue("white", "gray.800")}
			boxShadow={useColorModeValue("md", "none")}
			borderBottomWidth={useColorModeValue("none", "1px")}
		>
			{children.find((child) => child.type === Brand)?.props.children}
			<Spacer />
			<HStack
				spacing={3}
				display={{
					base: "none",
					md: "flex",
				}}
			>
				{children.find((child) => child.type === Links)?.props.children}
			</HStack>
			<Spacer />
			<HStack
				display={{
					base: "none",
					md: "flex",
				}}
				spacing={3}
			>
				<ConnectWallet />

				{isAuthenticated &&
					children.find((child) => child.type === UserProfile)?.props.children}
			</HStack>

			<IconButton
				display={{
					base: "flex",
					md: "none",
				}}
				size="sm"
				aria-label="Open menu"
				fontSize="20px"
				variant="ghost"
				onClick={mobileNav.onOpen}
				icon={<HamburgerIcon />}
			/>

			<MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose}>
				<Stack spacing={5}>
					<Flex>
						{children.find((child) => child.type === Brand)?.props.children}
					</Flex>
					<Stack>
						{children.find((child) => child.type === Links)?.props.children}
					</Stack>
					<Divider />
					<Flex>
						{
							children.find((child) => child.type === UserProfile)?.props
								.children
						}
					</Flex>
				</Stack>
			</MobileNavContent>
		</Flex>
	);
};

const Brand = () => null;

const Links = () => null;

const UserProfile = () => null;

export const Navbar = Object.assign(Template, {
	Brand,
	Links,
	UserProfile,
});
