import { useState } from "react"
import { useAuthStore } from "../store/authStore";
import { useShowToast } from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useUserProfileStore } from "../store/userProfileStore";
import { useGetUserProfileById } from "./useGetUserProfileById";

export const useEditProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
    const { userProfile } = useGetUserProfileById(authUser.uid);

    const showToast = useShowToast();

    const editProfile = async(inputs, selectedFile) => {
        if(isUpdating || !authUser)return; //Si se esta actualizando o no hay datos del usuario simplemente no hace nada
        setIsUpdating(true);

        const storageRef = ref(storage, `profilePics/${authUser.uid}`);
        const userDocRef = doc(firestore, 'users', authUser.uid);

        let URL = '';

        try {
            if(selectedFile){ //Si hay un archivo selecionado
                await uploadString(storageRef, selectedFile, 'data_url'); //No lo entiendo completamente, se supone que sube la imagen mediante string
                URL = await getDownloadURL(storageRef); //Lo que no entiendo es el getDownloadURL
            }

            const updateUser = {
                ...userProfile, //Suba todos los datos del authUser pero solo modifica aquellos que se especifiquen
                fullName: inputs.fullName || authUser.fullName,
                username: inputs.username || authUser.username,
                bio: inputs.bio || authUser.bio,
                profilePicURL: URL || authUser.profilePicURL
            }

            await updateDoc(userDocRef, updateUser) //Pide la referencia (A que apunta la data a actualizar) - Luego pide la data a actualizar
            localStorage.setItem('user-info', JSON.stringify(updateUser));
            setAuthUser(updateUser);
            setUserProfile(updateUser);
            showToast('Success', 'Profile updated successfully', 'success')

        } catch (error) {
            showToast('error', error.message, 'error')
        }
    }

    return {editProfile, isUpdating}
}
