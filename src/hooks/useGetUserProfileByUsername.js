import { useEffect, useState } from "react"
import { useShowToast } from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { useUserProfileStore } from "../store/userProfileStore";

//TODO: [Lo que hace este custon hoook] Busca si el username existe en la base de datos, si existe entonces guarda sus datos en un array y se establece el perfil del usuario con esos datos en el gestor de estado, en el store, retornando el userProfile con la data del usuario

export const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  //const userProfile = useUserProfileStore(state => state.userProfile);
  const {userProfile, setUserProfile} = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async() => {
        setIsLoading(true)
        try {
          const q = query(collection(firestore, 'users'), where('username', '==', username)); //Busca los datos del path en la base de datos
          const querySnapshot = await getDocs(q) //Obtiene los datos del usuario (El usuario buscado mediante su username en el path)

          if(querySnapshot.empty) return setUserProfile(null); //Si no encontro nada, realmente no hace nada

          let userDoc; //
          querySnapshot.forEach((doc) => { //Si encuentra el usuario (El usuario buscado mediante su username en el path) guarda sus datos en una variable llamada userDoc
            userDoc = doc.data();
          });

          setUserProfile(userDoc); //Establece el userProfile con los datos del usuario (El usuario buscado mediante su username en el path)
          console.log(userDoc)

        } catch (error) {
            showToast('error', error.message, 'error');
        } finally{
          setIsLoading(false); //Termina la carga
        }
    }   
    getUserProfile(); //Ejecuta la funcion
  }, [setUserProfile, username, showToast])
  
  return {isLoading, userProfile} //Retorna los valores del perfil del usuario (El usuario buscado mediante su username en el path) y los valores de carga
}
