import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { firestore, storage } from "../../firebase/firebase";
import { usePostStore } from "../../store/postStore";
import { useAuthStore } from "../../store/authStore";
import { useUserProfileStore } from "../../store/userProfileStore";
import { useShowToast } from "../../hooks/useShowToast";
import { Button } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

export const DeletePost = ({post}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const deletePost = usePostStore(state => state.deletePost);
    const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    const handleDeletePost = async() => {
        if(!window.confirm('Are you sure want to delete this post?')) return;
        if(isDeleting) return;
    
          try {
            const imageRef = ref(storage, `posts/${post.id}`); //Referencia a la imagen del post del usuario
            await deleteObject(imageRef); //Eliminar el objeto del storage, es decir eliminar la imagen del post
    
            const userRef = doc(firestore, "users", authUser.uid); //Referencia a la data del usuario (La coleccion de users)
    
            await deleteDoc(doc(firestore, 'posts', post.id)); //Eliminar el post del usuario. (La coleccion de posts)
    
            await updateDoc(userRef, { //Actualizar (La coleccion de users) quitando el post del id
              posts: arrayRemove(post.id)
            })
    
            deletePost(post.id);
            decrementPostsCount(post.id);
    
            showToast('success', 'Post deleted successfully', 'success');
          } catch (error) {
            showToast('error', error.message, 'error');
          } finally{
            setIsDeleting(false)
          }
      }

  return (
    <>
        {authUser?.uid === post.createdBy && (
            <Button
                size={"sm"} 
                bg={"transparent"} 
                _hover={{bg: "whiteAlpha.300", color: "red.600"}} 
                borderRadius={4} p={1}
                onClick={handleDeletePost}
                isLoading={isDeleting}
            >
                <MdDelete size={20} cursor={"pointer"}/>
            </Button>
        )}
    </>
  )
}
