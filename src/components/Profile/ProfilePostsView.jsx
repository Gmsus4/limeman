import { Box, Flex, Image, useDisclosure } from "@chakra-ui/react";
import { useGetUserProfileById } from "../../hooks/useGetUserProfileById";
import { PostHeader } from "../FeedPosts/PostHeader";
import { PostFooter } from "../FeedPosts/PostFooter";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ViewFullImage } from "./ViewFullImage";

export const ProfilePostsView = ({post}) => {
    const { userProfile } = useGetUserProfileById(post.createdBy);
    const location = useLocation();

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
      const { pathname } = location;
      const postId = pathname.split('/').pop(); // Get the post id from the URL
      const element = document.getElementById(postId); // Find the element by post id
  
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Scroll to the element
      }
    }, [location]);
    return (
        <>
            <Flex id={post.id} flexDir={"column"} m={0} mb={"30px"} p={0}>
              <PostHeader post={post} creatorProfile={userProfile}/>
              <Box aspectRatio={"1 / 1"} m={"auto"} w={"100%"} h={"100%"} my={4} borderRadius={10} overflow={"hidden"}>
                  <Image w={"full"} h={"full"} src={post.imageURL} /* alt={post.username} */
                    objectFit={"cover"}  
                    objectPosition={"center"}
                    onClick={onOpen}
                  />
                  <ViewFullImage post={post} isOpen={isOpen} onClose={onClose}/>
              </Box>
              <PostFooter post={post} creatorProfile={userProfile}/>
            </Flex>

{/*             <Modal
              isOpen={isOpen} 
              onClose={onClose}
              isCentered={true}
              size={{base: "3xl", md: "5xl"}}
            >
              <ModalOverlay />
              <ModalContent bgColor={"transparent"}>
                <ModalCloseButton bgColor={"primary.100"} color={"white"} borderRadius={"50%"}/>
                <ModalBody p={5} >
                  <Flex gap={4}>
                    <Flex borderRadius={8} overflow={"hidden"}
                      flex={1.5}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                    <Image w={"100%"} h={"100%"} objectFit={"cover"} src={post.imageURL} alt="profile post"/>
                    </Flex>
                  </Flex>
                </ModalBody>
              </ModalContent>
            </Modal> */}
        </>
    )
}

/* ml={{base: 2, md: 0}} */