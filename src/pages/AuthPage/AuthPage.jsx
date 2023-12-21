import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react"
import { AuthForm } from "../../components/AuthForm/AuthForm"

export const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"}alignItems={"center"} px={4}>
        <Container maxW={'container.md'} padding={0}> {/* Contenedor */}
          <Flex justifyContent={"center"} alignItems={"center"} px={4}> 
              {/* Left Hand-Side */}
              <Box display={{base: "none", md: "block"}}> {/* De base no tiene display pero en pantallas medianas el display es block  */}
                <Image 
                  h={250} alt="ImageBambuLogo"
                  src="https://res.cloudinary.com/dozzu7xhx/image/upload/v1702058636/Logos/logoOneX_edsiee.png"
                />
              </Box>

              {/* Right Hand-Side */}
              <VStack w={"300px"} spacing={4} align={"stretch"}> {/* Un div que esta configurado para que todo los hijos vayan en vertical */}
                  <AuthForm />
                  <Flex alignItems={"center"} justifyContent={"center"}>
                    <Image src="https://res.cloudinary.com/dozzu7xhx/image/upload/v1702058306/Logos/logoSuccessWhite_i7rbyx.png" h={10} alt="IMAGE A"/>
                  </Flex>
              </VStack>
          </Flex>
        </Container>
    </Flex>
  )
}
