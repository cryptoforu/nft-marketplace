import React from "react";
import { Box, Spinner } from "@chakra-ui/react";
const Loader = () => {
	return (
		<Box width="100%" height="100%">
			<Spinner position="fixed" left="50%" top="50%" zIndex={100} />
		</Box>
	);
};

export default Loader;
