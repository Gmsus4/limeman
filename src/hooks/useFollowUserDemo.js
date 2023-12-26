import { useEffect, useState } from "react"
import { useAuthStore } from "../store/authStore";
import { useShowToast } from "./useShowToast";
import { useUserProfileStore } from "../store/userProfileStore";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export const useFollowUser = (userId) => {
    const [isUpdating, setIsUpdating] = useState(false); //La carga
    const [isFollowing, setIsFollowing] = useState(false); //Indica Si sigue al otro usuario o no
    //const {user, setUser} = useAuthStore(); //La info del usuario autentificado
    const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
    const {userProfile, setUserProfile} = useUserProfileStore(); //Los datos del usuario (El usuario buscado mediante su username en el path)
    const showToast = useShowToast(); //Los mensajes personalizados

    const handleFollowUser = async() => {
        setIsUpdating(true);
        try {
            const currentUserRef = doc(firestore, "users", authUser.uid); //Obtiene la data del usuario mediante firestore
            const userToFollowOrUnfollow = doc(firestore, "users", userId); //Obtiene la data del id del usuario (El usuario buscado mediante su username en el path) a follow/unfollow

            await updateDoc(currentUserRef, { //Actualiza la data del following del usuario A (El autenticado)
                //pregunta si el usuario ya sigue al otro usuario, si lo sigue, entonces ahora lo dejara de seguir, pero si no lo sigue entonces ahora lo seguira
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId) 
            });

            await updateDoc(userToFollowOrUnfollow, { //Actualiza la data de los followers del usuario B (El no autenticado)
                //pregunta si el usuario ya sigue al otro usuario, si lo sigue, entonces ahora lo dejara de seguir, pero si no lo sigue entonces ahora lo seguira
                followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid) 
            })

            if(isFollowing){
                //unfollow
                setAuthUser({
                    ...authUser,
                    following: authUser.following.filter((uid) => uid !== userId)
                    // Filtra la lista de usuarios seguidos, excluyendo aquellos cuyo ID coincida con userId
                    // following hora contiene la lista de usuarios seguidos, excepto userId
                });

                if(userProfile)
                    setUserProfile({
                        ...userProfile,
                        followers: userProfile.followers.filter((uid) => uid !== authUser.uid)
                    });

                localStorage.setItem('user-info', JSON.stringify({
                    ...authUser,
                    following: authUser.following.filter((uid) => uid !== userId)
                }));

                setIsFollowing(false);
            } else{
                //follow
                setAuthUser({
                    ...authUser,
                    following: [...authUser.following, userId]
                    //De toda la lista de seguidores, agrega un dato mas que es el userId
                });

                if(userProfile)
                    setUserProfile({
                        ...userProfile,
                        followers: [...userProfile.followers, authUser.uid]
                    })

                localStorage.setItem('user-info', JSON.stringify({
                    ...authUser,
                    following: [...authUser.following, userId]
                }))

                setIsFollowing(true);
            }
        } catch (error) {
            showToast('error', error.message, 'error');
        } finally{
            setIsUpdating(false);
        }
    }

    useEffect(() => {
      if(authUser){
         //Si en la base de datos del usuario se pregunta si incluye la id de la persona a seguir, si la incluye entonces el isFollowing es true, si no la incluye, es false
         // Por lo tanto isFollowing indica si el usuario esta siguiendo o no a el otro usuario.
        const isFollowing = authUser.following.includes(userId);
        setIsFollowing(isFollowing);
      }
    }, [authUser, userId]);
    
  return {isUpdating, isFollowing, handleFollowUser}
}
