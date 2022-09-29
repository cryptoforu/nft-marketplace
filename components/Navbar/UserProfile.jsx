import {
	Flex,
	HStack,
	Avatar,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

export const UserProfile = (props) => {
	const { avatarUrl } = props;
	return (
		<>
			<Flex
				order={{
					base: 2,
					md: 1,
				}}
			></Flex>
			<HStack
				spacing={3}
				order={{
					base: 1,
					md: 2,
				}}
				flex="1"
			>
				<Menu>
					<MenuButton>
						<Avatar src={avatarUrl} size="sm" />
					</MenuButton>
					<MenuList>
						<Link href="/account/dashboard" passHref>
							<MenuItem>Profile</MenuItem>
						</Link>

						<Link href="" passHref>
							<MenuItem>Mint</MenuItem>
						</Link>
					</MenuList>
				</Menu>
			</HStack>
		</>
	);
};
