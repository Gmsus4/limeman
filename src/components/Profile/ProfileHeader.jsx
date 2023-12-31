import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { useUserProfileStore } from "../../store/userProfileStore"
import { useAuthStore } from "../../store/authStore";
import { EditProfile } from "./EditProfile";
import { useFollowUser } from "../../hooks/useFollowUser";
import { Following } from "../Sidebar/Following";
import { Followers } from "../Sidebar/Followers";

export const ProfileHeader = () => {
    const {userProfile} = useUserProfileStore();
    const authUser = useAuthStore(state => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(userProfile?.uid);

    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username; //Si authUser existe y si el authUser es igual al username
    const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username; //Si authUser existe y si el authUser es distinto a username

  return (
    <Flex className="divPadre" gap={{base: 4, sm: 10}} py={10} direction={{base: "column", sm: "row"}} alignItems={"center"}>
        <AvatarGroup 
        className="holaaaa"
            size={{base: "xl", sm: "2xl"}}
            justifySelf={"center"}
            alignSelf={"flex-start"}
            mx={"auto"}
        >
            <Avatar name={userProfile.fullName} src={userProfile.profilePicURL} />
        </AvatarGroup>

        <VStack  alignItems={{base: 'center', sm: "flex-start"}} gap={2} mx={"auto"} flex={1}>
            <Flex gap={4} direction={{base: "column", sm: "row"}}
                justifyContent={{base: "center", sm: "flex-start"}}
                alignItems={"center"}
            >
                <Text fontSize={{base: "sm", md: "lg"}}> {userProfile.username} </Text>
                {visitingOwnProfileAndAuth && (
                    <Flex gap={4} alignItems={"center"} justifyContent={"center"} >
                        <Button bg={"primary.100"} color={"whiteAlpha.900"} _hover={{bg: "primary.900"}} size={{base: "xs", md: "sm"}}
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
            </Flex>
            <Flex alignItems={"center"} gap={{base: 2, sm: 4}}>
                <Text fontSize={{base: "xs", md: "sm"}}>
                    <Text as={"span"} fontWeight={"bold"} mr={1}>
                        {userProfile.posts.length}
                    </Text>
                    Posts
                </Text>
                <Followers />
                <Following />
            </Flex>
            <Flex alignItems={"center"} gap={4}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                    {userProfile.fullName}
                </Text>
            </Flex>
                <Text fontSize={"sm"} >
                    {userProfile.bio}
                </Text>
        </VStack>
        {isOpen && <EditProfile isOpen={isOpen} onClose={onClose}/>}
    </Flex>
  )
}
