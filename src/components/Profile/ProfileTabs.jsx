import { Box, Flex, Text } from "@chakra-ui/react"
import { BsGrid3X3, BsBookmark, BsSuitHeart  } from "react-icons/bs";

export const ProfileTabs = () => {
  return (
    <Flex
      w={"full"}
      justifyContent={"center"}  
      gap={{base: 4, sm: 10}}
      textTransform={"uppercase"}
      fontWeight={"bold"}
    >
      <Flex mb={10} w={"full"} alignItems={"center"} p={3} gap={2} cursor={"pointer"} justifyContent={"center"}>
        <Text color={"primary.100"} fontSize={12} display={{base: "none", sm: "block"}}>Posts</Text>
      </Flex>
    </Flex>
  )
}
