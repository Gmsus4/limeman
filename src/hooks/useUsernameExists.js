import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export const useUsernameExists = () => {
    const searchUsernameExist = async (usernameToCheck) => {
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("username", "==", usernameToCheck));
        const querySnapshot = await getDocs(q);

        return !querySnapshot.empty; // Devuelve directamente el booleano
    };

    return { searchUsernameExist };
};

