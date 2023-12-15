import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useShowToast } from "./useShowToast"
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthStore } from "../store/authStore";

export const useLogin = () => {
    const showToast = useShowToast();
    const [
        signInWithEmailAndPassword,
        ,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore(state => state.login);

    const login = async(inputs) => {
        if(!inputs.email || !inputs.password){
            return showToast('error', 'Please fill all the fields', 'error')
        }
        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

            if(userCred){
                //Buscara en la collecition users y luego el ide del usuario para encontrar la data
                const docRef = doc(firestore, 'users', userCred.user.uid); // users > usuario     ||     users > usuario id
                const docSnap = await getDoc(docRef); //Obtenemos los datos del usuario 
                localStorage.setItem('user-info', JSON.stringify(docSnap.data()));
                loginUser(docSnap.data());
            }
        } catch (error) {
            showToast('error', error.message, 'error')
        }
    }

    return {loading, error, login}
}
