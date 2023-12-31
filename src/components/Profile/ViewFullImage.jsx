import { Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text } from "@chakra-ui/react";

export const ViewFullImage = ({post, isOpen, onClose} ) => {
    
  return (
    <>
        <Modal
            isOpen={isOpen} 
            onClose={onClose}
            isCentered={true}
            size={{base: "3xl", md: "5xl"}}
        >
            <ModalOverlay />
            <ModalContent boxShadow={"none"} bgColor={"transparent"}>
            <ModalCloseButton bgColor={"primary.100"} color={"white"} borderRadius={"50%"}/>
            <ModalBody p={5} >
                <Flex gap={4}>
                <Flex borderRadius={8} overflow={"hidden"}
                    flex={1.5}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                <Image w={"100%"} h={"100%"} objectFit={"cover"} src={post.imageURL} alt="profile post"/>
                </Flex>
                </Flex>
            </ModalBody>
            </ModalContent>
        </Modal>
    </>
  )
}
