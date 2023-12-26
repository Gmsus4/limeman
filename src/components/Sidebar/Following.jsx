import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { useAuthStore } from "../../store/authStore";
import { useUserProfileStore } from "../../store/userProfileStore";
import { SuggestedUser } from "../SuggestedUsers/SuggestedUser";
import { useGetFollowing } from "../../hooks/useGetFollowing";

export const Following = () => {
	const authUser = useAuthStore((state) => state.user);
	const {userProfile} = useUserProfileStore();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;

	const user = visitingOwnProfileAndAuth ? authUser : userProfile;

	const { followingUsers } = useGetFollowing(user);

  return (
	<>
		<Text cursor={"pointer"} fontSize={{base: "xs", md: "sm"}} onClick={onOpen}>
			<Text as={"span"} fontWeight={"bold"} mr={1}>
				{visitingOwnProfileAndAuth ? authUser.following.length : userProfile.following.length}
				
				{/*  {             userProfile.following.length} */}
			</Text>
			Following
		</Text>
		<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
			<ModalOverlay />
			<ModalContent maxW={"400px"}>
				<ModalHeader color={"primary.100"}>Following</ModalHeader>
				<ModalCloseButton/>
				<ModalBody pb={6}>    
					<VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>    
					{followingUsers.length > 0 ? (
						followingUsers?.map((user, idx) => (
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
