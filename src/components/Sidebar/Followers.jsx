import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { useAuthStore } from "../../store/authStore";
import { useUserProfileStore } from "../../store/userProfileStore";
import { useGetFollowers } from "../../hooks/useGetFollowers";
import { SuggestedUser } from "../SuggestedUsers/SuggestedUser";

export const Followers = () => {
    const authUser = useAuthStore((state) => state.user);
	const {userProfile} = useUserProfileStore();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
    const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

	const user = visitingOwnProfileAndAuth ? authUser : userProfile;

	const { followersUsers } = useGetFollowers(user);

  return (
	<>
		<Text cursor={"pointer"} fontSize={{base: "xs", md: "sm"}} onClick={onOpen}>
			<Text as={"span"} fontWeight={"bold"} mr={1}>
                {/* {visitingOwnProfileAndAuth ? authUser.followers.length : userProfile.followers.length} */}


                {visitingOwnProfileAndAuth ? authUser.followers.length : userProfile.followers.length}
                {/* {visitingAnotherProfileAndAuth && userProfile.followers.length} */}
			</Text>
			Followers
		</Text>

		<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
			<ModalOverlay />
			<ModalContent maxW={"400px"}>
				<ModalHeader color={"primary.100"}>Followers</ModalHeader>
				<ModalCloseButton/>
				<ModalBody pb={6}>    
					<VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
					{followersUsers.length > 0 ? (
						followersUsers?.map((user, idx) => (
							<SuggestedUser user={user} key={idx} />
						))
					) : (<Text color={"red.300"}>The list of people you follow is empty because you haven't started following anyone yet.</Text>)}  
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	</>
  )
}
