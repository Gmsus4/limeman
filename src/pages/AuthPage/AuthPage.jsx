import { Box, Container, Flex, Image, VStack, useColorMode } from "@chakra-ui/react"
import { AuthForm } from "../../components/AuthForm/AuthForm"

export const AuthPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex flexDir={"column"} minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
        <Container maxW={'container.md'} padding={0}
           w={"350px"} py={"40px"} px={"60px"} borderRadius={20} display={"flex"} flexDir={"column"}
           boxShadow={"rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;"}
           alignItems={"center"}
        > 
          <Image cursor={"pointer"} onClick={toggleColorMode} w={"150px"} src="https://res.cloudinary.com/dozzu7xhx/image/upload/v1702058636/Logos/logoOneX_edsiee.png" />
          <AuthForm />
        </Container>
    </Flex>
  )
}
