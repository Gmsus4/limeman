import {create} from "zustand";

export const usePostStore = create((set) => ({
    posts: [],
	createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
    deletePost: (id) => set(state => ({posts: state.posts.filter(post => post.id !== id)})), //De toda la lista de posts va a filtrar todos los distintos al id
    //addComment
    setPosts: (posts) => set({posts})
}));