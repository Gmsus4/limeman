import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { useUserProfileStore } from "../../store/userProfileStore"
import { useAuthStore } from "../../store/authStore";
import { EditProfile } from "./EditProfile";
import { useFollowUser } from "../../hooks/useFollowUser";
import { Following } from "../Sidebar/Following";
import { Followers } from "../Sidebar/Followers";

export const ProfileHeaderMin = () => {
    const {userProfile} = useUserProfileStore();
    const authUser = useAuthStore(state => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(userProfile?.uid);

    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username; //Si authUser existe y si el authUser es igual al username
    const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username; //Si authUser existe y si el authUser es distinto a username

  return (
    <Flex w="full" gap={{base: 4, sm: 10}} direction={"column"} alignItems={"center"}>
        <Flex alignItems={"center"} gap={2} w={{base: "full", sm: "auto"}}> {/* IMAGEN PERFIL Y NOMBRE */}
            <Flex flexDir={"column"} alignItems={"center"} gap={2}>
                <AvatarGroup 
                    className="holaaaa"
                    size={{base: "xl", sm: "2xl"}}
                    justifySelf={"center"}
                    alignSelf={"flex-start"}
                    display={"flex"}
                    flexDir={"column"}
                >
                    <Avatar name={userProfile.fullName} src={userProfile.profilePicURL} />
                </AvatarGroup>
                <Text display={{base: "none", sm: "flex"}} fontSize={"sm"} fontWeight={"bold"}>
                    {userProfile.fullName}
                </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2} w={"full"} alignItems={"flex-start"} mx={4}>
                <Flex gap={4} direction={{base: "column", sm: "row"}}
                    justifyContent={{base: "center", sm: "flex-start"}}
                    alignItems={"center"}
                >
                    <Text fontWeight={"600"} fontSize={{base: "lg", md: "lg"}}> <span style={{color: 'grey'}}>@</span>{userProfile.username} </Text>
                </Flex>
                {visitingOwnProfileAndAuth && (
                    <Flex gap={4} alignItems={"center"} justifyContent={"center"} >
                        <Button bg={"primary.100"} color={"whiteAlpha.900"} _hover={{bg: "primary.900"}} size={{base: "sm", md: "sm"}}
                            onClick={onOpen}
                        >
                            Edit Profile
                        </Button>
                    </Flex>
                )}

                {visitingAnotherProfileAndAuth && (
                    <Flex gap={4} alignItems={"center"} justifyContent={"center"} >
                        <Button 
                            bg={"blue.500"} 
                            color={"white"} 
                            _hover={{bg: "blue.600"}} 
                            size={{base: "xs", md: "sm"}} 
                            onClick={handleFollowUser}
                            isLoading={isUpdating}
                        >
                            {isFollowing ? "Unfollow" : "Follow"}
                        </Button> 
                    </Flex>
                )}
                <VStack display={{base: "none", sm: "flex"}} gap={1} flex={1} w={"auto"} className="asdasdasdasd">
                    <Flex w={{base: "full", sm: "auto"}} alignItems={"flex-start"} flexDir={"column"} gap={1}>
                        <Text fontSize={"sm"} >
                            {userProfile.bio}
                        </Text>
                    </Flex>
                </VStack>
            </Flex>
        </Flex>

        <VStack display={{base: "flex", sm: "none"}} gap={1} flex={1} w={"95%"} className="asdasdasdasd"> {/* Username e info */}
            <Flex w={{base: "full", sm: "auto"}} alignItems={"flex-start"} flexDir={"column"} gap={1}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                    {userProfile.fullName}
                </Text>
                <Text fontSize={"sm"} >
                    {userProfile.bio}
                </Text>
            </Flex>
        </VStack>
        <Flex w={"full"} justifyContent={"space-around"} alignItems={"center"} gap={{base: 2, sm: 4}}> {/* POST - FOLLOWERS - FOLLOWING */}
            <Flex flexDir={"column"} alignItems={"center"}>
                <Text as={"span"} fontWeight={"bold"} mr={1} fontSize={20}>
                    {userProfile.posts.length}
                </Text>
                <Text fontSize={{base: "xs", md: "sm"}}>
                    Posts
                </Text>
            </Flex>
            <Followers />
            <Following />
        </Flex>
        {isOpen && <EditProfile isOpen={isOpen} onClose={onClose}/>}
    </Flex>
  )
}