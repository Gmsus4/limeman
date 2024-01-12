import { Avatar, Box, Button, Flex, SkeletonCircle, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useFollowUser } from "../../hooks/useFollowUser"
import { timeAgo } from "../../utils/timeAgo"
import { useAuthStore } from "../../store/authStore"
import { MdAdminPanelSettings } from "react-icons/md"

export const PostHeader = ({post, creatorProfile, display}) => {
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post?.createdBy)
  const authUser = useAuthStore((state) => state.user);
  //console.log(post)
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

          {creatorProfile && display && ( 
            <Link to={`/${creatorProfile.username}`}>
              <Flex color={"#DEF7EC"} bgColor={"#057A55"} px={2} py={1} borderRadius={6} gap={2}>
                <Text>
                  {creatorProfile.username} 
                </Text>
                <Text>•</Text>
                <Text display={"flex"} flexDir={"row"} alignItems={"center"} gap={1}>
                   Admin <MdAdminPanelSettings />
                </Text>
              </Flex>
            </Link>
          )}

          {creatorProfile && !display && (
            <Link to={`/${creatorProfile.username}`}>
              <Text color={ display && "white"}>
                {creatorProfile.username}
              </Text>

            </Link>
          )}

          { !display && (
            <Box color={"gray.500"}> • {timeAgo(post?.createdAt)} </Box>
          )}
          </Flex>
        </Flex>
        <Box
          cursor={"pointer"}
        >
            {authUser?.uid === post?.createdBy 
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
