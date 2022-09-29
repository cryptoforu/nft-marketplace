import { Box } from "@chakra-ui/react";
import * as React from "react";
import Image from "next/image";
export const Logo = () => {
	return (
		<Box>
			<Image src="/logo.png" alt="cryptoforu nft" width={40} height={40} />
		</Box>
	);
};
