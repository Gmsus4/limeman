import { Box, Flex, Tooltip } from "@chakra-ui/react"
import { ImAddressBook } from "react-icons/im";

export const Suggested = ({color}) => {
  return (
    <Tooltip
        hasArrow
        label={"Suggested"}
        placement='right'
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
    >
        <Flex
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            justifyContent={{ base: "center", md: "flex-start" }}
        >
            <ImAddressBook fontSize={"25px"} color={color}/>
            {/* <Box color={"white"} display={{ base: "none", md: "block" }}>Suggested</Box> */}
        </Flex>
    </Tooltip>
  )
}
