import { useEffect, useState } from "react";
import { useShowToast } from "./useShowToast";
import { useAuthStore } from "../store/authStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export const useGetFollowers = (user) => {
    const [isLoading, setIsLoading] = useState(true);
	const [followersUsers, setFollowersUsers] = useState([]);
    const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
    useEffect(() => {
        const getFollowersUsers = async () => {
            setIsLoading(true);
            //console.log(user)
            try {
                if (user && user.followers && user.followers.length > 0) {
                    const usersRef = collection(firestore, "users");
                    const q = query(usersRef, where("uid", "in", user.followers));

                    const querySnapshot = await getDocs(q);
                    const followersUsersArray = [];

                    querySnapshot.forEach((doc) => {
                        followersUsersArray.push({ ...doc.data(), id: doc.id });
                    });

                    setFollowersUsers(followersUsersArray);
                } else {
                    setFollowersUsers([]); // Manejo cuando authUser.following está vacío o no es un array válido
                }
            } catch (error) {
                showToast('error', error.message, 'error')
            } finally {
                setIsLoading(false);
            }
        }
    
        if (authUser) getFollowersUsers();
    }, [authUser, showToast])
  return {isLoading, followersUsers}
}
