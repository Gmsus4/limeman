import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from "../firebase/firebase";
import { doc, setDoc } from 'firebase/firestore';
import { useShowToast } from './useShowToast';
import { useAuthStore } from '../store/authStore';

export const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, , loading, error,] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore(state => state.login);

    const signup = async (inputs) => {
        if(!inputs.email || !inputs.password || !inputs.username || !inputs.fullName){ //Pequeña validación
            showToast('Error', 'Please fill all the fields', 'error')
            return;
        }
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if(!newUser && error){ //Si no hay un usuario y tenemos un error
                //showToast('error', error.message, 'error')
                return
            } else{
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullName: inputs.fullName,
                    bio: "",
                    profilePictureURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now()
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
                return;
            }
        } catch (error) {
            //showToast('error', error.message, 'error')
        }
    }
    return { loading, error, signup }
}