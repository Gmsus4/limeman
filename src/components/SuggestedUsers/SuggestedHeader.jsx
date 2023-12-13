import { Avatar, Flex, Link, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

export const SuggestedHeader = () => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
            <Avatar name="As a Programmer" size={"md"} src="https://res.cloudinary.com/dozzu7xhx/image/upload/v1686943818/perfil/azbel14qetbdbs282zem.jpg"/> {/* size={"md"} */}
            <Text fontSize={12} fontWeight={"bold"}>
                fergm_
            </Text>
        </Flex>
        <Link
            as={RouterLink}
            to={"/auth"}
            fontSize={14}
            fontWeight={"medium"}
            color={"blue.400"}
            style={{textDecoration: "none"}}
            cursor={"pointer"}
        >
            Log out
        </Link>
    </Flex>
  )
}
