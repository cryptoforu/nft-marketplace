import React, { useEffect, useCallback } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork, useSigner, useBalance } from "wagmi";
import { useAppState } from "../store/store";
const ConnectWallet = () => {
	const { address, isDisconnected, isConnected } = useAccount();
	const { chain: activeChain } = useNetwork();
	const { data: signer, isFetched } = useSigner();

	const {
		setSignIn,
		setActivating,
		setCurrentProvider,
		setContractSigner,
		setIsReady,
		isAuthenticated,
		setUser,
		setSigner,
		setSignOut,
		setWeb3,
	} = useAppState();
	const signIn = useCallback(async () => {
		try {
			const chainId = activeChain?.id;
			const explorer = activeChain?.blockExplorers.default.url;
			if (!address || !chainId) return;
			setActivating(true);
			if (isConnected) {
				await setSignIn(address, chainId, explorer);
				setActivating(false);
			}
			if (isFetched) {
				await setSigner(signer);
				setWeb3();
			}
		} catch (error) {
			console.log(error);
		}
	}, [
		setSignIn,
		activeChain,
		address,
		isConnected,
		setActivating,
		setSigner,
		signer,
		isFetched,
		setWeb3,
	]);
	useEffect(() => {
		signIn();
	}, [signIn, isAuthenticated, signer]);
	const signOut = useCallback(async () => {
		if (isDisconnected) {
			setSignOut();
			setCurrentProvider();
		}
	}, [isDisconnected, setCurrentProvider, setSignOut]);
	useEffect(() => {
		if (isConnected) {
			return;
		}
		signOut();
	}, [isConnected, signOut]);

	return (
		<>
			<ConnectButton showBalance={false} chainStatus="icon" />
		</>
	);
};

export default ConnectWallet;
