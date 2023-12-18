import { Avatar, Box, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Comment } from "../Comments/Comment";
import { PostFooter } from "../FeedPosts/PostFooter";
import { useUserProfileStore } from "../../store/userProfileStore";
import { useAuthStore } from "../../store/authStore";

export const ProfilePost = ({post}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);

  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid "}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1/1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{opacity: 1}}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.300"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50} >
            <Flex alignItems={"center"}>
              <AiFillHeart size={20}/>
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>

            <Flex alignItems={"center"}>
              <FaComment size={20}/>
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image src={post.imageURL} alt="Profile post" w={"100%"} h={"100%"} objectFit={"cover"}/>
      </GridItem>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        isCentered={true}
        size={{base: "3xl", md: "5xl"}}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex gap={4} w={{base: "90%", sm: "70%", md: "full"}} mx={"auto"} maxH={"90vh"} minH={"50vh"}>
              <Flex borderRadius={4} overflow={"hidden"} border={"1px solid"} 
                backgroundColor={"whiteAlpha.300"} 
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                  <Image w={"100%"} h={"100%"} objectFit={"cover"} src={post.imageURL} alt="profile post"/>
              </Flex>
              <Flex flex={1} flexDir={"column"} px={10} display={{base: "none", md: "flex"}}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar 
                      src={userProfile.profilePicURL} 
                      size={"sm"} name="As a programer"
                    ></Avatar>
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  {authUser?.uid === userProfile.uid && (
                    <Button size={"sm"} bg={"transparent"} _hover={{bg: "whiteAlpha.300", color: "red.600"}} borderRadius={4} p={1}>
                      <MdDelete size={20} cursor={"pointer"}/>
                    </Button>
                  )}
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                  <Comment
                    createAt='1d ago'
                    username='gmsus4'
                    profilePic='https://res.cloudinary.com/dozzu7xhx/image/upload/v1686943818/perfil/azbel14qetbdbs282zem.jpg'
                    text='Comentarios sin sentido xd'
                  />
                  <Comment
                    createAt='1d ago'
                    username='gmsus4'
                    profilePic='https://res.cloudinary.com/dozzu7xhx/image/upload/v1686943818/perfil/azbel14qetbdbs282zem.jpg'
                    text='Comentarios sin sentido xd'
                  />
                  <Comment
                    createAt='1d ago'
                    username='gmsus4'
                    profilePic='https://res.cloudinary.com/dozzu7xhx/image/upload/v1686943818/perfil/azbel14qetbdbs282zem.jpg'
                    text='Comentarios sin sentido xd Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe omnis doloremque maxime ad quidem nemo quia quisquam cum dolore sint exercitationem vitae blanditiis natus error, odit ab quasi corporis porro? '
                  />
                                  <Comment
                    createAt='1d ago'
                    username='gmsus4'
                    profilePic='https://res.cloudinary.com/dozzu7xhx/image/upload/v1686943818/perfil/azbel14qetbdbs282zem.jpg'
                    text='Comentarios sin sentido xd Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe omnis doloremque maxime ad quidem nemo quia quisquam cum dolore sint exercitationem vitae blanditiis natus error, odit ab quasi corporis porro? '
                  />
                                  <Comment
                    createAt='1d ago'
                    username='gmsus4'
                    profilePic='https://res.cloudinary.com/dozzu7xhx/image/upload/v1686943818/perfil/azbel14qetbdbs282zem.jpg'
                    text='Comentarios sin sentido xd Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe omnis doloremque maxime ad quidem nemo quia quisquam cum dolore sint exercitationem vitae blanditiis natus error, odit ab quasi corporis porro? '
                  />
                                  <Comment
                    createAt='1d ago'
                    username='gmsus4'
                    profilePic='https://res.cloudinary.com/dozzu7xhx/image/upload/v1686943818/perfil/azbel14qetbdbs282zem.jpg'
                    text='Comentarios sin sentido xd Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe omnis doloremque maxime ad quidem nemo quia quisquam cum dolore sint exercitationem vitae blanditiis natus error, odit ab quasi corporis porro? '
                  />
                                  <Comment
                    createAt='1d ago'
                    username='gmsus4'
                    profilePic='https://res.cloudinary.com/dozzu7xhx/image/upload/v1686943818/perfil/azbel14qetbdbs282zem.jpg'
                    text='Comentarios sin sentido xd Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe omnis doloremque maxime ad quidem nemo quia quisquam cum dolore sint exercitationem vitae blanditiis natus error, odit ab quasi corporis porro? '
                  />
                                  <Comment
                    createAt='1d ago'
                    username='gmsus4'
                    profilePic='https://res.cloudinary.com/dozzu7xhx/image/upload/v1686943818/perfil/azbel14qetbdbs282zem.jpg'
                    text='Comentarios sin sentido xd Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe omnis doloremque maxime ad quidem nemo quia quisquam cum dolore sint exercitationem vitae blanditiis natus error, odit ab quasi corporis porro? '
                  />
                                  <Comment
                    createAt='1d ago'
                    username='gmsus4'
                    profilePic='https://res.cloudinary.com/dozzu7xhx/image/upload/v1686943818/perfil/azbel14qetbdbs282zem.jpg'
                    text='Comentarios sin sentido xd Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe omnis doloremque maxime ad quidem nemo quia quisquam cum dolore sint exercitationem vitae blanditiis natus error, odit ab quasi corporis porro? '
                  />
                                  <Comment
                    createAt='1d ago'
                    username='gmsus4'
                    profilePic='https://res.cloudinary.com/dozzu7xhx/image/upload/v1686943818/perfil/azbel14qetbdbs282zem.jpg'
                    text='Comentarios sin sentido xd Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe omnis doloremque maxime ad quidem nemo quia quisquam cum dolore sint exercitationem vitae blanditiis natus error, odit ab quasi corporis porro? '
                  />
                </VStack>
                <Divider my={4} bg={"gray.800"} />
                <PostFooter isProfilePage={true}/>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}