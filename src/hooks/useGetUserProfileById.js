import { useEffect, useState } from "react";
import { useShowToast } from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const useGetUserProfileById = (userId) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);

    const showToast = useShowToast();

    useEffect(() => {
      const getUserProfile = async () => {
        setIsLoading(true);
        setUserProfile(null);
        try {
            const userRef = await getDoc(doc(firestore, 'users', userId)); //Referencia a la data del usuario
            if(userRef.exists()){ //Si el usuario existe
                setUserProfile(userRef.data()); //Establece el usuario con el valor de la data del usuario que se busco mediante la id
            }
        } catch (error) {
            showToast('error', error.message, 'error');
        } finally{
            setIsLoading(false);
        }
      }
      getUserProfile();
    }, [showToast, setUserProfile, userId])
    
    return { isLoading, userProfile, setUserProfile }
}
