import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react"
import { FeedPost } from "./FeedPost"
import { useGetFeedPosts } from "../../hooks/useGetFeedPosts"
import { useGetUserProfileById } from "../../hooks/useGetUserProfileById";
import { PostHeader } from "./PostHeader";
import { RiMessengerLine } from "react-icons/ri";
import { FaArrowDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const FeedPosts = () => {
  const {isLoading, posts} = useGetFeedPosts();
  const { userProfile } = useGetUserProfileById('oMJP4jMzScXWt9In70bTGEPU0tA2');
  // console.log('userProfile:')
  // console.log(userProfile)
  //"Se agregó al usuario admin al inicio de los posts con direccion a Instagram real xd
  const postUserAdmin = {
    createdBy: 'oMJP4jMzScXWt9In70bTGEPU0tA2'
  }

  return (
    <>
      <Flex flexDirection={"column"} marginBottom={"40px"}>
        <Flex gap={3} marginLeft={2} alignItems={"center"} mb={2}>
          <FaArrowDown size={30} style={{color: "#689c54"}}/>
          <Text color={"primary.900"} fontWeight={"500"} fontSize={{base: 12, md: 16}}>Deja tu comentario o sugerencia en mi perfil de Instagram.</Text>
        </Flex>
        <Flex gap={2} borderRadius={8} boxShadow={"rgba(0, 0, 0, 0.1) 0px 10px 50px;"} background={"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(131,178,113,1) 0%, rgba(255,255,255,0) 100%);"}>
          <Flex marginRight={2} color={"white"} alignItems={"center"} className="instagram" p={2} borderRadius={6}>
            <Link to={`https://www.instagram.com/gmsus4/`} target="_blank">
              <Flex alignItems={"center"} gap={1}>
                <RiMessengerLine size={30}/>
              </Flex>
            </Link>
          </Flex>
          <PostHeader post={postUserAdmin} display={true} creatorProfile={userProfile}/>
        </Flex>
      </Flex>
      <Container className="hollaaa" maxW={"container.sm"} px={2} > {/* py={10} */}
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
        {!isLoading && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post}/>)}
        {!isLoading && posts.length === 0 && (
          <>
            <Text fontSize={"md"} color={"red.400"}>
              Dayuum. Looks like you don&apos;t have any friends
            </Text>
            <Text color={"red.400"}>Stop coding and go make some!</Text>
          </>
        )}
      </Container>
    </>
  )
}
