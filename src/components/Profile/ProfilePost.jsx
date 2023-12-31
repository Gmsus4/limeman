import { Avatar, Box, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack, useBreakpointValue, useDisclosure } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Comment } from "../Comments/Comment";
import { PostFooter } from "../FeedPosts/PostFooter";
import { useUserProfileStore } from "../../store/userProfileStore";
import { useAuthStore } from "../../store/authStore";
import { useShowToast } from "../../hooks/useShowToast";
import { useRef, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { usePostStore } from "../../store/postStore";
import { Caption } from "../Comments/Caption";
import { Link, useNavigate } from "react-router-dom";
import { DeletePost } from "./DeletePost";

export const ProfilePost = ({post}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {isSmallScreen ? (
        <Link to={`/${userProfile.username}/posts/${post.id}`} >
          <GridItem
            cursor={"pointer"}
            borderRadius={4}
            overflow={"hidden"}
            position={"relative"}
            aspectRatio={1/1}
            id={post.id}
            // onClick={handlePostsView}
          >
            <Flex
              opacity={0}
              _hover={{opacity: 1}}
              position={"absolute"}
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg={"blackAlpha.500"}
              transition={"all 0.3s ease"}
              zIndex={1}
              justifyContent={"center"}
              display={{base: 'none', md: 'flex'}}
            >
              <Flex alignItems={"center"} justifyContent={"center"} gap={50} >
                <Flex alignItems={"center"}>
                  <AiFillHeart size={20} color="white"/>
                  <Text fontWeight={"bold"} color={"whiteAlpha.900"} ml={2}>
                    {post.likes.length}
                  </Text>
                </Flex>

                <Flex alignItems={"center"}>
                  <FaComment size={20} color="white"/>
                  <Text fontWeight={"bold"} color={"whiteAlpha.900"} ml={2}>
                    {post.comments.length}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Image src={post.imageURL} alt="Profile post" w={"100%"} h={"100%"} objectFit={"cover"}/>
          </GridItem>
        </Link>
      ) : (
        <>
          <GridItem
            cursor={"pointer"}
            borderRadius={4}
            overflow={"hidden"}
            position={"relative"}
            aspectRatio={1/1}
            id={post.id}
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
              bg={"blackAlpha.500"}
              transition={"all 0.3s ease"}
              zIndex={1}
              justifyContent={"center"}
              display={{base: 'none', md: 'flex'}}
            >
              <Flex alignItems={"center"} justifyContent={"center"} gap={50} >
                <Flex alignItems={"center"}>
                  <AiFillHeart size={20} color="white"/>
                  <Text fontWeight={"bold"} color={"whiteAlpha.900"} ml={2}>
                    {post.likes.length}
                  </Text>
                </Flex>

                <Flex alignItems={"center"}>
                  <FaComment size={20} color="white"/>
                  <Text fontWeight={"bold"} color={"whiteAlpha.900"} ml={2}>
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
              <ModalBody p={5}>
                <Flex gap={4} w={{base: "90%", sm: "70%", md: "full"}} mx={"auto"} maxH={"90vh"} minH={"50vh"}>
                  <Flex borderRadius={8} overflow={"hidden"} boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"}
                    flex={1.5}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                  <Image w={"100%"} h={"100%"} objectFit={"cover"} src={post.imageURL} alt="profile post"/>
                  </Flex>
                  <Flex flex={1} flexDir={"column"} px={10} display={{base: "none", md: "flex"}}>
                    <Flex alignItems={"center"} justifyContent={"space-between"} mt={2}>
                      <Flex alignItems={"center"} gap={4}>
                        <Avatar 
                          src={userProfile.profilePicURL} 
                          size={"sm"} name="As a programer"
                        ></Avatar>
                        <Text fontWeight={"bold"} fontSize={12}>
                          {userProfile.username}
                        </Text>
                      </Flex>
                      <DeletePost post={post}/>
                    </Flex>
                    <Divider my={4} bg={"gray.500"} />
                    <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                        {/* CAPTION */}
                        {post.caption && <Caption post={post} />}
                        {/* COMMENTS */}
                        {post.comments.map((comment, idx) => (
                          <Comment key={idx} comment={comment}/>
                        ))}
                    </VStack>
                    <Divider my={4} bg={"gray.800"} />
                    <PostFooter 
                      isProfilePage={true} 
                      post={post}
                    />
                  </Flex>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  )
}