import { Box, Grid, Skeleton, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { ProfilePost } from "./ProfilePost";

export const ProfilePosts = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, [])
  
  return (
    <Grid
      templateColumns={{
        sm: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)"
      }}  
      gap={1}
      columnGap={1}
    >
      {isLoading && [0,1,2,3,4,5].map((_, idx) => (
        <VStack key={idx} alignItems={"flex-start"} gap={4}>
          <Skeleton w={"full"}>
            <Box h={"300px"}>contents wrapped</Box>
          </Skeleton>
        </VStack>
      ))}

      {!isLoading && (

        <>
          <ProfilePost img='https://images.pexels.com/photos/1906932/pexels-photo-1906932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
          <ProfilePost img='https://images.pexels.com/photos/2361/nature-animal-wolf-wilderness.jpg?auto=compress&cs=tinysrgb&w=600'/>
          <ProfilePost img='https://images.pexels.com/photos/682361/pexels-photo-682361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
          <ProfilePost img='https://images.pexels.com/photos/531533/pexels-photo-531533.jpeg?auto=compress&cs=tinysrgb&w=600'/>
          <ProfilePost img='https://images.pexels.com/photos/158108/wolf-predator-carnivores-pack-animal-158108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
        </>
      )}
      
    </Grid>
  )
}
