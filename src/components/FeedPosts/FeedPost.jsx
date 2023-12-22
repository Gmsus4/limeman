import { Box, Flex, Image } from "@chakra-ui/react"
import { PostHeader } from "./PostHeader"
import { PostFooter } from "./PostFooter"
import { useGetUserProfileById } from "../../hooks/useGetUserProfileById"

export const FeedPost = ({post}) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  return (
    <>
      <Flex flexDir={"column"} m={0} mb={"30px"} p={0}>
            <PostHeader post={post} creatorProfile={userProfile} />
            <Box my={4} borderRadius={10} overflow={"hidden"}>
                <Image w={"full"} src={post.imageURL} /* alt={post.username} *//>
            </Box>
            <PostFooter post={post} creatorProfile={userProfile}/>
      </Flex>
    </>
  )
}
