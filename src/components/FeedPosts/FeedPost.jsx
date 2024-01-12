import { Box, Flex, Image, useDisclosure } from "@chakra-ui/react"
import { PostHeader } from "./PostHeader"
import { PostFooter } from "./PostFooter"
import { useGetUserProfileById } from "../../hooks/useGetUserProfileById"
import { ViewFullImage } from "../Profile/ViewFullImage"

export const FeedPost = ({post}) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log('los posts');
  //console.log(post);
  return (
    <>
      <Flex flexDir={"column"} m={0} mb={"30px"} p={0}>
        <PostHeader post={post} creatorProfile={userProfile} />
        <Box borderRadius={10} overflow={"hidden"} aspectRatio={"1 / 1"} m={"auto"} my={4} w={"100%"} h={"100%"}>
            <Image w={"full"} h={"full"} src={post.imageURL}                
              objectFit={"cover"}  
              objectPosition={"center"}
              onClick={onOpen}
              cursor={"pointer"}
            />
            <ViewFullImage post={post} isOpen={isOpen} onClose={onClose}/>
        </Box>
        <PostFooter post={post} creatorProfile={userProfile}/>
      </Flex>
    </>
  )
}
