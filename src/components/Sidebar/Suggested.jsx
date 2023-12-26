import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tooltip, VStack, useDisclosure } from "@chakra-ui/react"
import { useSearchUser } from "../../hooks/useSearchUser";
import { SuggestedUser } from "../SuggestedUsers/SuggestedUser";
import { ImAddressBook } from "react-icons/im";
import { useGetSuggestedUsers } from "../../hooks/useGetSuggestedUsers";

export const Suggested = ({color}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { setUser } = useSearchUser();
  const { suggestedUsers } = useGetSuggestedUsers();

	const handleClose = () => {
		onClose();
		setUser(null);
	}

  return (
	<>
		<Tooltip
			hasArrow
			label={"Suggested"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
		>
			<Flex
				alignItems={"center"}
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
				onClick={onOpen}
			>
				<ImAddressBook fontSize={"30px"} color={color}/>
				<Box color={"white"} display={{ base: "none", md: "block" }}>Suggested</Box>
			</Flex>
		</Tooltip>

		<Modal isOpen={isOpen} onClose={handleClose} motionPreset='slideInLeft'>
			<ModalOverlay />
			<ModalContent maxW={"400px"}>
				<ModalHeader color={"primary.100"}>Suggested for you</ModalHeader>
				<ModalCloseButton/>
				<ModalBody pb={6}>    
					<VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>      
					{suggestedUsers.map(user => (
						<SuggestedUser user={user} key={user.id}/>
					))}
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	</>
  )
}
