import { Avatar, Box, Button, Flex, SkeletonCircle, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useFollowUser } from "../../hooks/useFollowUser"
import { timeAgo } from "../../utils/timeAgo"
import { useAuthStore } from "../../store/authStore"

export const PostHeader = ({post, creatorProfile}) => {
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy)
  const authUser = useAuthStore((state) => state.user);
  //console.log(creatorProfile)
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}> {/* my={2} */}
        <Flex alignItems={"center"} gap={2}>

          {creatorProfile ? (
            <Link to={`/${creatorProfile.username}`}>
              <Avatar src={creatorProfile.profilePicURL}
                alt="user perfil picture" size={"sm"}
              />
            </Link>
          ) : (
            <SkeletonCircle size={10} />
          )}

          <Flex fontSize={12} fontWeight={"bold"} gap={2}>

          {creatorProfile ? (
            <Link to={`/${creatorProfile.username}`}>
              {creatorProfile.username}
            </Link>
          ) : (
            <SkeletonCircle size={10} />
          )}

            <Box color={"gray.500"}> • {timeAgo(post.createdAt)} </Box>
          </Flex>
        </Flex>
        <Box
          cursor={"pointer"}
        >
            {authUser?.uid === post.createdBy 
              ? ('') 
              : (
                <Button 
                  size={"xs"}
                  bg={"transparent"}
                  fontSize={12} 
                  color={"primary.100"}
                  fontWeight={"bold"}
                  _hover={{
                    color: "primary.900"
                  }}
                  transition={"0.2s ease-in-out"}
                  onClick={handleFollowUser}
                  isLoading={isUpdating}
                >
                  {isFollowing ? 'Unfollow' : 'Follow'}
                 </Button>
              )
            }
        </Box>
    </Flex>
  )
}
