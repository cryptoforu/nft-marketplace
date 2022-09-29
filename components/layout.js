import { Center, useColorModeValue as mode } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { Logo } from "./Navbar/Logo";
import { Navbar } from "./Navbar/Navbar";
import { NavLink } from "./Navbar/NavLink";
import { UserProfile } from "./Navbar/UserProfile";

export default function Layout({ children }) {
	return (
		<>
			<Navbar>
				<Navbar.Brand>
					<Center marginEnd="10">
						<Logo />
					</Center>
				</Navbar.Brand>
				<Navbar.Links>
					<NextLink href="/" passHref>
						<NavLink isActive>Explore</NavLink>
					</NextLink>
					<NavLink>Stats</NavLink>
					<NavLink>Collection</NavLink>
				</Navbar.Links>
				<Navbar.UserProfile>
					<UserProfile avatarUrl="/images/nft-user-48.png" />
				</Navbar.UserProfile>
			</Navbar>

			{children}
		</>
	);
}
