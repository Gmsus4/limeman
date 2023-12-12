import { Box, Button, Flex, Image, Input, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true) //useState para verificar si esta login o se esta registrando
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleAuth = () => { //Verificar
        if(!inputs.email || !inputs.password){
            alert("Please fill all the fields");
        }
        navigate("/");
    }

    return (
        <>
            <Box border={"1px solid green"} borderRadius={12} padding={5}>
                <VStack>
                    <Image h={24} cursor={"pointer"} alt="LimemanLogo"
                        src="https://res.cloudinary.com/dozzu7xhx/image/upload/v1702058636/Logos/logoOneX_edsiee.png"
                    />
                    <Input placeholder="Email" fontSize={14} type="email"
                        value={inputs.email}
                        onChange={(e) => setInputs({...inputs, email: e.target.value})}
                    />
                    <Input placeholder="Password"fontSize={14}type="password"
                        value={inputs.password}
                        onChange={(e) => setInputs({...inputs, password: e.target.value})}
                    />

                    {!isLogin ? (<Input placeholder="Confirm Password"
                        value={inputs.password}
                        onChange={(e) => setInputs({...inputs, password: e.target.value})}
                        fontSize={14} type="password"/>) : null
                    }

                    <Button w={"full"} colorScheme="green" size={"sm"} fontSize={14} onClick={handleAuth}>
                        {isLogin ? "Login" : "Sign Up"}
                    </Button>

                    {/* ------------------------  OR TEXT ----------------------------*/}
                    <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                        <Box flex={2} height={"1px"} bg={"gray.400"}/>
                        <Text mx={1} color={"dark"}>OR</Text>
                        <Box flex={2} height={"1px"} bg={"gray.400"}/>
                    </Flex>

                    <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
                        <Image src="/google.png" w={5} alt="Google logo"/>
                        <Text mx={2} color={"blue.500"}>
                            Log in with Google
                        </Text>
                    </Flex>
                </VStack>
            </Box>

            <Box border={"1px solid green"} borderRadius={12} padding={5}>
            <Flex alignItems={"center"} justifyContent={"center"}>
                <Box mx={2} fontSize={14}>
                    {isLogin ? "Don't have an account" : "Already have an account"}
                </Box>
                <Box onClick={()=> setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                    {isLogin ? "Sign Up" : "Login"}
                </Box>
            </Flex>
            </Box>
        </>
    )
}
