import {
	Box,
	Progress,
	HStack,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

export const UserBalance = (props) => {
	const { icon, balance, symbol, isLoading, ...rest } = props;

	return (
		<HStack {...rest}>
			<Text
				fontWeight="medium"
				fontSize="xl"
				lineHeight="1"
				color={mode("gray.600", "gray.400")}
			>
				{isLoading ? (
					<Progress size="xs" isIndeterminate />
				) : (
					<>
						Balance: {balance} {symbol}
					</>
				)}
			</Text>
		</HStack>
	);
};
