import { Button, Flex, Tooltip, useColorMode } from "@chakra-ui/react"
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";

export const ToogleDark = ({color}) => {
    const { colorMode, toggleColorMode } = useColorMode()
  return(
        <Flex
            alignItems={"center"}
            gap={4}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            justifyContent={{ base: "center", md: "flex-start" }}
        >
            <Flex alignItems={"center"} gap={2} onClick={toggleColorMode}>
                {colorMode === 'light' ? <CiDark color={color} fontSize={"30px"} /> :  <CiLight color={color} fontSize={"30px"}/>} 
            </Flex>
        </Flex>
  )
}
