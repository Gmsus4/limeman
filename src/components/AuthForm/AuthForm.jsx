import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { Login } from "./Login"
import { GoogleAuth } from "./GoogleAuth"
import { Signup } from "./Signup"

export const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true) //useState para verificar si esta login o se esta registrando
    return (
        <>
        <Box>
            <VStack spacing={4}>
                <Text colorScheme="green" variant={"h2"} textAlign={"center"} fontSize={"40px"}>{isLogin ? 'Sign In' : 'Signup'}</Text>
                <GoogleAuth prefix={isLogin ? 'Log in' : 'Sign up'}/>
                {isLogin ? <Login /> : <Signup/>}
                <Box borderRadius={12} padding={2}>
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Box mx={2} fontSize={14}>
                        {isLogin ? "Don't have an account" : "Already have an account"}
                    </Box>
                    <Box onClick={()=> setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                        {isLogin ? "Sign Up" : "Login"}
                    </Box>
                </Flex>
            </Box> 
            </VStack>
        </Box>

{/*            <Box borderRadius={12} padding={5}>
                <VStack spacing={4}>
                    <Image h={24} cursor={"pointer"} alt="LimemanLogo"
                        src="https://res.cloudinary.com/dozzu7xhx/image/upload/v1702058636/Logos/logoOneX_edsiee.png"
                    />

                    {isLogin ? <Login /> : <Signup/>}

                    <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                        <Box flex={2} height={"1px"} bg={"gray.400"}/>
                        <Text mx={1} color={"white"}>OR</Text>
                        <Box flex={2} height={"1px"} bg={"gray.400"}/>
                    </Flex>

                    <GoogleAuth prefix={isLogin ? 'Log in' : 'Sign up'}/>
                </VStack>
            </Box>

            <Box border={"1px solid grey"} borderRadius={12} padding={5}>
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Box mx={2} fontSize={14}>
                        {isLogin ? "Don't have an account" : "Already have an account"}
                    </Box>
                    <Box onClick={()=> setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                        {isLogin ? "Sign Up" : "Login"}
                    </Box>
                </Flex>
            </Box>  */}
        </>
    )
}
