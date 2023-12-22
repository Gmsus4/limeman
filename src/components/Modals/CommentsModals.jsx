import {Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import { Comment } from "../Comments/Comment";
import { usePostsComment } from "../../hooks/usePostsComment";
import { useEffect, useRef } from "react";
    
export const CommentsModal = ({ isOpen, onClose, post }) => {
    const { handlePostComment, isCommenting } = usePostsComment();
    const commentRef = useRef(null);
    /* const commentsContainerRef = useRef(null); */
    const handleSubmitCommit = async(e) => {
        //do not refresh the page, prevent it
        e.preventDefault();
        await handlePostComment(post.id, commentRef.current.value);
        commentRef.current.value = '';
    }

/*     useEffect(() => {
      const scrollToBotton = () =>{
        commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
      }
      if(isOpen){
        setTimeout(() => {
            scrollToBotton();
        }, 100);
      }
    }, [isOpen, post.comments.length]) */
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
            <ModalOverlay />
            <ModalContent maxW={"400px"}>
                <ModalHeader>Comments</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex mb={4} gap={4} 
                        flexDir={"column"} 
                        maxH={"250px"} 
                        overflowY={"auto"} 
                        /* ref={commentsContainerRef} */
                    >

                        {post.comments.map((comment, idx) => (
                            <Comment key={idx} comment={comment} />
                        ))}

                    </Flex>
                    <form onSubmit={handleSubmitCommit} style={{ marginTop: "2rem" }}>
                        <Input placeholder='Comment' size={"sm"} ref={commentRef}/>
                        <Flex w={"full"} justifyContent={"flex-end"}>
                            <Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isCommenting}>
                                Post
                            </Button>
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};