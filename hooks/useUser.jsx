import { useCallback, useEffect } from "react";
import { useAppState } from "../components/store/store";
import { useRouter } from "next/router";

function useUser() {
	const { isAuthenticated, account, setUser, user } = useAppState();
	const router = useRouter();

	const isUser = useCallback(async () => {
		try {
			if (!isAuthenticated) {
				router.push("/");
			}
			await setUser(account);
		} catch (error) {
			console.log(error);
		}
	}, [isAuthenticated, router, account, setUser]);
	useEffect(() => {
		isUser();
	}, [isUser]);

	return { user };
}

export default useUser;
