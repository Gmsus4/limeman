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
                    const followingUsers = [];

                    // Divide user.following en segmentos de 30 usuarios por consulta
                    const segmentSize = 30;
                    const totalSegments = Math.ceil(user.following.length / segmentSize);

                    for (let i = 0; i < totalSegments; i++) {
                        const startIdx = i * segmentSize;
                        const endIdx = (i + 1) * segmentSize;
                        const segment = user.following.slice(startIdx, endIdx);

                        const q = query(usersRef, where("uid", "in", segment));
                        const querySnapshot = await getDocs(q);

                        querySnapshot.forEach((doc) => {
                            followingUsers.push({ ...doc.data(), id: doc.id });
                        });
                    }

                    setFollowingUsers(followingUsers);
                } else {
                    setFollowingUsers([]);
                }
            } catch (error) {
                showToast('error', error.message, 'error');
            } finally {
                setIsLoading(false);
            }
        };

        if (authUser) getFollowingUsers();
    }, [authUser, showToast]);

    return { isLoading, followingUsers };
};





//Codigo anterior
/* import { useEffect, useState } from "react";
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
} */
