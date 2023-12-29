import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useShowToast } from "./useShowToast";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export const useGetSuggestedUsers = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [suggestedUsers, setSuggestedUsers] = useState([]);
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
  
	useEffect(() => {
	  const getSuggestedUsers = async () => {
		setIsLoading(true);
		try {
		  const usersRef = collection(firestore, "users");
		  const querySnapshot = await getDocs(usersRef);
  
		  const users = [];
		  querySnapshot.forEach((doc) => {
			const user = { ...doc.data(), id: doc.id };
			// Excluir al usuario autenticado y a los usuarios a los que ya sigue
			if (user.uid !== authUser.uid && !authUser.following.includes(user.uid)) {
			  users.push(user);
			}
		  });
  
		  // Limitar la cantidad de usuarios aquí o realizar ordenamientos adicionales si es necesario
		  const limitedUsers = users.slice(0, 5);
  
		  setSuggestedUsers(limitedUsers);
		} catch (error) {
		  showToast("Error", error.message, "error");
		} finally {
		  setIsLoading(false);
		}
	  };
  
	  if (authUser) getSuggestedUsers();
	}, [authUser, showToast]);
  
	return { isLoading, suggestedUsers };
  };  

// export const useGetSuggestedUsers = () => {
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [suggestedUsers, setSuggestedUsers] = useState([]);
// 	const authUser = useAuthStore((state) => state.user);
// 	const showToast = useShowToast();

// 	useEffect(() => {
// 		const getSuggestedUsers = async () => {
// 			setIsLoading(true);
// 			try {
// 				const usersRef = collection(firestore, "users");
// 				const q = query(usersRef, //. Todos los uid que no contengan
//                     where("uid", "not-in", [authUser.uid, ...authUser.following]), 
//                     orderBy("uid"), 
//                     //limit(limitUsers)
//                 ); 

// 				const querySnapshot = await getDocs(q);
// 				const users = [];

// 				querySnapshot.forEach((doc) => {
// 					users.push({ ...doc.data(), id: doc.id });
// 				});

// 				setSuggestedUsers(users);
// 			} catch (error) {
// 				showToast("Error", error.message, "error");
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		if (authUser) getSuggestedUsers();
// 	}, [authUser, showToast]);

// 	return { isLoading, suggestedUsers };
// }
