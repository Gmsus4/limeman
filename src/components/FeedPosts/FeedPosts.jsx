import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react"
import { FeedPost } from "./FeedPost"
import { useEffect, useState } from "react"

export const FeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }, [])
  
  return (
    <Container maxW={"container.sm"} px={2}> {/* py={10} */}
      {isLoading && 
        [0, 1, 2, 3].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10} >
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height={"10px"} w={"200px"}/>
                <Skeleton height={"10px"} w={"200px"}/>
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"500px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))  
      }

      {!isLoading && (
        <>
          <FeedPost 
            img='https://images.pexels.com/photos/19137935/pexels-photo-19137935/free-photo-of-mujer-escritorio-chaqueta-rubia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' username='Jacky Hong' avatar='https://images.pexels.com/users/avatars/771747059/hoang-phi-hong-654.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=1'/>
          <FeedPost 
            img='https://images.pexels.com/photos/18004059/pexels-photo-18004059/free-photo-of-caballo-comiendo-en-libertad.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
            username='José Antonio Espinosa' avatar='https://images.pexels.com/users/avatars/3813500/jose-antonio-espinosa-724.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=1'/>
          <FeedPost 
            img='https://images.pexels.com/photos/17691842/pexels-photo-17691842/free-photo-of-mujer-en-pie-disfraz-sombra.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
            username='Nataliia Holovchuk' avatar='https://images.pexels.com/users/avatars/657655723/pexels-user-760.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=1'/>
          <FeedPost 
            img='https://images.pexels.com/photos/18714729/pexels-photo-18714729/free-photo-of-paisaje-naturaleza-mujer-caminando.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
            username='Luke Miller' avatar='https://images.pexels.com/users/avatars/2498658/luke-miller-175.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=1'/>
          <FeedPost 
            img='https://images.pexels.com/photos/14198675/pexels-photo-14198675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
            username='Yuliia Tretynychenko' avatar='https://images.pexels.com/users/avatars/211350148/-978.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=1'/>
          <FeedPost 
            img='https://images.pexels.com/photos/19261071/pexels-photo-19261071/free-photo-of-nieve-pajaro-invierno-rama.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
            username='Andrzej Polska' avatar='https://images.pexels.com/users/avatars/815779371/andrzej-polska-371.png?auto=compress&fit=crop&h=130&w=130&dpr=1'/>
        </>
      )}
    </Container>
  )
}
