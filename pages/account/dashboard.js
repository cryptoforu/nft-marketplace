import React from "react";
import Head from "next/head";
import PageHeader from "../../components/account/PageHeader";
import { useBalance } from "wagmi";
import useUser from "../../hooks/useUser";
import { useAppState } from "../../components/store/store";
import Loader from "../../components/Loader";
import { forNumber } from "../../lib/numberFormat";
import { explorerUrl } from "../../lib/blockExplorers";
const Dashboard = () => {
	const { userReady, account, currentExplorer } = useAppState();

	const { user } = useUser();
	const { data, isLoading } = useBalance({
		addressOrName: account,
		suspense: true,
		formatUnits: "ether",
	});
	if (!userReady) {
		return <Loader />;
	}
	if (userReady) {
		return (
			<>
				<Head>
					<title>Dashboard</title>
				</Head>
				<div>
					<PageHeader
						href={explorerUrl(currentExplorer, user.address)}
						address={user.address}
						isLoading={isLoading}
						balance={forNumber(data?.formatted, 4)}
						symbol={data?.symbol}
					/>
				</div>
			</>
		);
	}
};

export default Dashboard;
