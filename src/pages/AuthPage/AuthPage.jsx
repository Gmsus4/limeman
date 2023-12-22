import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react"
import { AuthForm } from "../../components/AuthForm/AuthForm"

export const AuthPage = () => {
  return (
    <Flex bg={"#f6f5f7"} flexDir={"column"} minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
        <Container maxW={'container.md'} padding={0}
           w={"350px"} py={"40px"} px={"60px"} borderRadius={20} display={"flex"} flexDir={"column"} bg={"white"} 
           boxShadow={"rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px"}
           alignItems={"center"}
        > 
          <Image w={"150px"} src="https://res.cloudinary.com/dozzu7xhx/image/upload/v1702058636/Logos/logoOneX_edsiee.png"/>
          <AuthForm />
        </Container>
    </Flex>
  )
}
