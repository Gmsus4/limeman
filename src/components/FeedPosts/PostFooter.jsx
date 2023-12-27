import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants"
import { usePostsComment } from "../../hooks/usePostsComment"
import { useAuthStore } from "../../store/authStore"
import { useLikePost } from "../../hooks/useLikePost"
import { timeAgo } from "../../utils/timeAgo"
import { CommentsModal } from "../Modals/CommentsModals"

export const PostFooter = ({post, isProfilePage, creatorProfile}) => {
  const {isCommenting, handlePostComment} = usePostsComment();
  const [comment, setComment] = useState('');
  const authUser = useAuthStore(state => state.user)
  const commentRef = useRef(null);
  const {handleLikePost, isLiked, likes} = useLikePost(post);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleSubmitComment = async() => {
    await handlePostComment(post.id, comment);
    setComment('');
  }

  return (
    <Box mb={10} marginTop={"auto"} marginBottom={2}>
      <Flex alignItems={"center"} gap={4} w={"80px"} pt={0} mb={2} bg={"primary.100"} justifyContent={"start"} p={2} borderRadius={20}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18} >
          {!isLiked ? (<NotificationsLogo />) : (<UnlikeLogo />)}
        </Box>
        <Box cursor={"pointer"} fontSize={18} onClick={()=> commentRef.current.focus()}>
          <CommentLogo/>
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"} ml={{base: 2, md: 0}}>
        {likes} likes
      </Text>
      
      {/* El prop isProfilePage parece estar diseñado para controlar el comportamiento del componente PostFooter basado en si la página actual es la página de perfil de un usuario. Si está obteniendo true solo cuando entra en la página del post y no en otras páginas, podría haber varias razones: */}
      {isProfilePage && (
        <Text fontSize="12" color={"gray"} ml={{base: 2, md: 0}}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}
			{!isProfilePage && (
				<>
					<Text fontSize='sm' fontWeight={700} ml={{base: 2, md: 0}}>
						{creatorProfile?.username}{" "}
						<Text as='span' fontWeight={400}>
							{post.caption}
						</Text>
					</Text>
					{post.comments.length > 0 && (
						<Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen} ml={{base: 2, md: 0}}>
							View all {post.comments.length} comments
						</Text>
					)}
					{/* COMMENTS MODAL ONLY IN THE HOME PAGE */}
          {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post}/> : null}
				</>
			)}
      {authUser && (
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <InputGroup w={{base: "97%", md: 'full'}} m={"auto"}>
            <Input variant={"flushed"} placeholder="Add a comment..." fontSize={14} 
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"primary.100"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{color: "primary.900"}}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  )
}
