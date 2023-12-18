import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react"
import { SuggestedHeader } from "./SuggestedHeader"
import { useGetSuggestedUsers } from "../../hooks/useGetSuggestedUsers"
import { SuggestedUser } from "./SuggestedUser";

export const SuggestedUsers = () => {
   const {isLoading, suggestedUsers} = useGetSuggestedUsers();

   // optional: render loading skeleton
   if(isLoading) return null;

  return (
    <VStack py={10} px={6} gap={4}>
        <SuggestedHeader />

        {suggestedUsers.length !== 0 && (
            <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                    Suggested for you
                </Text>
                <Text fontSize={12} fontWeight={"bold"} _hover={{color: "grey.400"}} cursor={"pointer"}>
                    See All
                </Text>
            </Flex>
        )}

        {suggestedUsers.map(user => (
            <SuggestedUser user={user} key={user.id}/>
        ))}

        <Box fontSize={12} color={"gray.500"} mt={5}>
            ®️ 2023 Built By {" "}
            <Link href="https://www.youtube.com/@gmsus_4" target="_blank" color={"blue.500"} fontSize={14}> 
                As a Programer
            </Link>
        </Box>
    </VStack>
  )
}
