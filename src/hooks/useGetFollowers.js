import { useEffect, useState } from "react";
import { useShowToast } from "./useShowToast";
import { useAuthStore } from "../store/authStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export const useGetFollowers = (user) => {
    const [isLoading, setIsLoading] = useState(true);
    const [followersUsers, setfollowersUsers] = useState([]);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        const getFollowingUsers = async () => {
            setIsLoading(true);

            try {
                if (user && user.followers && user.followers.length > 0) {
                    const usersRef = collection(firestore, "users");
                    const followersUsers = [];

                    // Divide user.following en segmentos de 30 usuarios por consulta
                    const segmentSize = 30;
                    const totalSegments = Math.ceil(user.followers.length / segmentSize);

                    for (let i = 0; i < totalSegments; i++) {
                        const startIdx = i * segmentSize;
                        const endIdx = (i + 1) * segmentSize;
                        const segment = user.followers.slice(startIdx, endIdx);

                        const q = query(usersRef, where("uid", "in", segment));
                        const querySnapshot = await getDocs(q);

                        querySnapshot.forEach((doc) => {
                            followersUsers.push({ ...doc.data(), id: doc.id });
                        });
                    }

                    setfollowersUsers(followersUsers);
                } else {
                    setfollowersUsers([]);
                }
            } catch (error) {
                showToast('error', error.message, 'error');
            } finally {
                setIsLoading(false);
            }
        };

        if (authUser) getFollowingUsers();
    }, [authUser, showToast]);

    return { isLoading, followersUsers };
};