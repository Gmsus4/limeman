import { useEffect, useState } from "react";
import { useShowToast } from "./useShowToast";
import { useAuthStore } from "../store/authStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export const useGetFollowing = (user) => {
    const [isLoading, setIsLoading] = useState(true);
	const [followingUsers, setFollowingUsers] = useState([]);
    const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
    useEffect(() => {
        const getFollowingUsers = async () => {
            setIsLoading(true);
            try {
                if (user && user.following && user.following.length > 0) {
                    const usersRef = collection(firestore, "users");
                    const q = query(usersRef, where("uid", "in", user.following));

                    const querySnapshot = await getDocs(q);
                    const followingUsers = [];

                    querySnapshot.forEach((doc) => {
                        followingUsers.push({ ...doc.data(), id: doc.id });
                    });

                    setFollowingUsers(followingUsers);
                } else {
                    setFollowingUsers([]); // Manejo cuando authUser.following está vacío o no es un array válido
                }
            } catch (error) {
                showToast('error', error.message, 'error')
            } finally {
                setIsLoading(false);
            }
        }
    
        if (authUser) getFollowingUsers();
    }, [authUser, showToast])
  return {isLoading, followingUsers}
}
