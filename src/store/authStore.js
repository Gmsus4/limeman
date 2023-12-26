import { create } from 'zustand';
/* import {devtools} from 'zustand/middleware'; */

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user-info")),
    login: (user) => set({user}),   
    logout: () => set({user: null}),
    setUser: (user) => set({user}),
}))
