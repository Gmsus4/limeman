import { create } from 'zustand';
import {devtools} from 'zustand/middleware';

export const useUserProfileStore = create(devtools((set) => ({
	userProfile: null,
	setUserProfile: (userProfile) => set({ userProfile }),
	// this is used to update the number of posts in the profile page
	addPost: (post) =>
		set((state) => ({
			userProfile: { 
				...state.userProfile, 
				posts: [post.id, ...state.userProfile.posts] },
		})),
	deletePost: (postId) => set((state) => ({
		userProfile: {
			...state.userProfile,
			posts: state.userProfile.posts.filter((id) => id !== postId),
		}
	}))
})));

//Los datos del usuario, tan solo con el path 


// Estado inicial:

// userProfile: null define el estado inicial del perfil de usuario como nulo.
// Métodos para actualizar el estado:

// setUserProfile: Este método actualiza el perfil completo del usuario. Toma un objeto userProfile y lo establece como el nuevo estado.
// addPost: Este método agrega un nuevo post al perfil del usuario. Toma un objeto post y lo agrega a la lista de posts en el perfil. Utiliza el método set de zustand que toma una función de estado para realizar la actualización.
// Explicación detallada de addPost:

// addPost toma un nuevo post como parámetro.
// Usa set de zustand, que recibe una función del estado actual (state) y devuelve un nuevo estado. Dentro de esta función:
// Se usa la sintaxis de propagación (...state.userProfile) para mantener las propiedades existentes del perfil de usuario.
// Se actualiza la propiedad posts del perfil. Se agrega el id del nuevo post al inicio de la lista de posts ([post.id, ...state.userProfile.posts]).
// El código es un ejemplo de cómo manejar el estado del perfil de usuario, permitiendo actualizar el perfil completo o añadir nuevos posts al perfil utilizando zustand.