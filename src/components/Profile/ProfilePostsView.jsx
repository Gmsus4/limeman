import { Box, Flex, Image } from "@chakra-ui/react";
import { useGetUserProfileById } from "../../hooks/useGetUserProfileById";
import { PostHeader } from "../FeedPosts/PostHeader";
import { PostFooter } from "../FeedPosts/PostFooter";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const ProfilePostsView = ({post}) => {
    const { userProfile } = useGetUserProfileById(post.createdBy);
    const location = useLocation();

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
                    <Box my={4} borderRadius={10} overflow={"hidden"}>
                        <Image w={"full"} src={post.imageURL} /* alt={post.username} *//>
                    </Box>
                    <PostFooter post={post} creatorProfile={userProfile}/>
            </Flex>
        </>
    )
}
