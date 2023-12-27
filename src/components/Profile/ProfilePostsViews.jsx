import { Box, Button, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react"
import { useGetUserPosts } from "../../hooks/useGetUserPosts";
import { ProfilePostsView } from "./ProfilePostsView";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetUserProfileByUsername } from "../../hooks/useGetUserProfileByUsername";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect } from "react";

export const ProfilePostsViews = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  //console.log(username);
  const { userProfile } = useGetUserProfileByUsername(username);
  const {isLoading, posts} = useGetUserPosts();

  //console.log(posts);
  return (
    <Container className="hollaaa" maxW={"container.sm"} px={2} >
      <Flex my={4} mb={6} mx={4} alignItems={"center"} gap={4}>
        <BsArrowLeft fontSize={"26px"} onClick={() => navigate(`/${username}`)} cursor={"pointer"}/>
        <Text fontSize={"26px"}>Posts</Text>
      </Flex>
      {isLoading && 
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10} className="hola2">
              <Flex gap={2}>
                <SkeletonCircle size={10} />
                <VStack gap={2} alignItems={"flex-start"}>
                  <Skeleton height={"10px"} w={"200px"}/>
                  <Skeleton height={"10px"} w={"200px"}/>
                </VStack>
              </Flex>
              <Skeleton w={"full"}>
                <Box h={"400px"}>contents wrapped</Box>
              </Skeleton>
          </VStack>
        ))  
      }
      {!isLoading && posts.length > 0 && posts.map((post) => <ProfilePostsView key={post.id} post={post}/>)}
    </Container>
  )
}
