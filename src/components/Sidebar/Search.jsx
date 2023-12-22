import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react"
import { SearchLogo } from "../../assets/constants"
import { useSearchUser } from "../../hooks/useSearchUser";
import { useRef, useState } from "react";
import { SuggestedUser } from "../SuggestedUsers/SuggestedUser";
import { CiSearch } from "react-icons/ci";

export const Search = ({color}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const searchRef = useRef(null);
	const { user, isLoading, getUserProfile, setUser } = useSearchUser();

	const handleSearchUser = (e) => {
		e.preventDefault();
		getUserProfile(searchRef.current.value);
	};

	const handleClose = () => {
		onClose();
		setUser(null);
	}

  return (
	<>
		<Tooltip
			hasArrow
			label={"Search"}
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
				<CiSearch fontSize={"30px"} color={color}/>
				<Box color={"white"} display={{ base: "none", md: "block" }}>Search</Box>
			</Flex>
		</Tooltip>

		<Modal isOpen={isOpen} onClose={handleClose} motionPreset='slideInLeft'>
			<ModalOverlay />
			<ModalContent maxW={"400px"}>
				<ModalHeader color={"primary.100"}>Search user</ModalHeader>
				<ModalCloseButton/>
				<ModalBody pb={6}>
					<form onSubmit={handleSearchUser}>
						<FormControl>
							<FormLabel m={0} fontWeight={100}>Username</FormLabel>
							<Flex display={"flex"} alignItems={"center"} w={"full"} gap={5}>
								<Flex flexDir={"column"} w={"full"}>
									<Input placeholder='John_Lennon' ref={searchRef} />
								</Flex>
								<Flex justifyContent={"flex-end"}>
									<Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isLoading} bg={"primary.100"} color={"whiteAlpha.900"} _hover={{ bg: "primary.900"}}>
										Search
									</Button>
								</Flex>
							</Flex>
						</FormControl>
					</form>
					{user && <SuggestedUser user={user} setUser={setUser}/>}
				</ModalBody>
			</ModalContent>
		</Modal>
	</>
  )
}
