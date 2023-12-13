import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react"
import { SuggestedHeader } from "./SuggestedHeader"
import { SuggestedUser } from "./SuggestedUser"

export const SuggestedUsers = () => {
  return (
    <VStack py={10} px={6} gap={4}>
        <SuggestedHeader />

        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
            <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                Suggested for you
            </Text>
            <Text fontSize={12} fontWeight={"bold"} _hover={{color: "grey.400"}} cursor={"pointer"}>
                See All
            </Text>
        </Flex>

        <SuggestedUser name='Luke Miller' followers={1324} avatar='https://images.pexels.com/users/avatars/2498658/luke-miller-175.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=1'/>
        <SuggestedUser name='Andrzej Polska' followers={1324} avatar='https://images.pexels.com/users/avatars/815779371/andrzej-polska-371.png?auto=compress&fit=crop&h=130&w=130&dpr=1'/>
        <SuggestedUser name='Nataliia Holovchuk' followers={1324} avatar='https://images.pexels.com/users/avatars/657655723/pexels-user-760.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=1'/>

        <Box fontSize={12} color={"gray.500"} mt={5}>
            ®️ 2023 Built By {" "}
            <Link href="https://www.youtube.com/@gmsus_4" target="_blank" color={"blue.500"} fontSize={14}> 
                As a Programer
            </Link>
        </Box>
    </VStack>
  )
}
