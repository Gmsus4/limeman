import { useState } from "react"
import { useShowToast } from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useSearchUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);
	const showToast = useShowToast();

	const getUserProfile = async (username) => {
		setIsLoading(true);
		setUser(null);
		try {
			const q = query(collection(firestore, "users"), where("username", "==", username));

			const querySnapshot = await getDocs(q);
			if (querySnapshot.empty) return showToast("Error", "User not found", "error");
			
			let data = [];
			querySnapshot.forEach((doc) => {
				data.push(doc.data());
			});
			//console.log(data)

			querySnapshot.forEach((doc) => {
				setUser(doc.data());
			});
			//console.log("Datos del usuario encontrado: ")
			console.log(user)
		} catch (error) {
			showToast("Error", error.message, "error");
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};
  return {isLoading, getUserProfile, user, setUser}
}
