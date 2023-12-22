import { Box, Button, CloseButton, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { usePreviewImg } from "../../hooks/usePreviewImg";
import { useShowToast } from "../../hooks/useShowToast";
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useAuthStore } from "../../store/authStore";
import { usePostStore } from "../../store/postStore";
import { useUserProfileStore } from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { GoPlusCircle } from "react-icons/go";

export const CreatePost = ({color}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [caption, setCaption] = useState("");
	const imageRef = useRef(null);
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const showToast = useShowToast();
	const { isLoading, handleCreatePost } = useCreatePost();

	const handlePostCreation = async () => {
		try {
			await handleCreatePost(selectedFile, caption);
			onClose();
			setCaption("");
			setSelectedFile(null);
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<>
			<Tooltip
				hasArrow
				label={"Create"}
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
					<GoPlusCircle color={color} fontSize={"30px"} />
					<Box color={"white"} display={{ base: "none", md: "block" }}>Create</Box>
				</Flex>
			</Tooltip>

			<Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader color={"primary.100"}>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea
							placeholder='Post caption...'
							value={caption}
							onChange={(e) => setCaption(e.target.value)}
						/>

						<Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

						<BsFillImageFill
							onClick={() => imageRef.current.click()}
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={16}
						/>
						{selectedFile && (
							<Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
								<Image src={selectedFile} alt='Selected img' />
								<CloseButton
									position={"absolute"}
									top={2}
									right={2}
									onClick={() => {
										setSelectedFile(null);
									}}
								/>
							</Flex>
						)}
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={handlePostCreation} isLoading={isLoading} bg={"primary.100"} color={"whiteAlpha.900"} _hover={{ bg: "primary.900"}}>
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

function useCreatePost() {
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const createPost = usePostStore((state) => state.createPost);
	const addPost = useUserProfileStore((state) => state.addPost);
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const { pathname } = useLocation();

	const handleCreatePost = async (selectedFile, caption) => {
		if (isLoading) return;
		if (!selectedFile) throw new Error("Please select an image");
		setIsLoading(true);
		const newPost = {
			caption: caption,
			likes: [],
			comments: [],
			createdAt: Date.now(),
			createdBy: authUser.uid,
		};

		try {
			//Este código agrega un nuevo documento (newPost) a la colección llamada 'posts' en la base de datos Firestore. Retorna una referencia al documento recién creado (postDocRef).
			const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
			//Obtiene una referencia al documento del usuario actual (authUser.uid) en la colección 'users'
			const userDocRef = doc(firestore, "users", authUser.uid);
			//Obtiene una referencia al archivo de imagen asociado al nuevo post en Firebase Storage. Utiliza el postDocRef.id como nombre del archivo en el directorio 'posts/'
			const imageRef = ref(storage, `posts/${postDocRef.id}`);

			//Actualiza el documento del usuario (userDocRef) agregando el postDocRef.id a un campo de tipo array llamado posts. Utiliza arrayUnion para agregar el id del nuevo post al array existente.
			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
			//Sube la imagen (selectedFile) al lugar especificado por imageRef en Firebase Storage. El tipo de archivo que se está subiendo es una URL de datos ("data_url").
			await uploadString(imageRef, selectedFile, "data_url");

			//Obtiene la URL de descarga de la imagen que se subió anteriormente a Firebase Storage. Esto permite acceder a la imagen desde la web.
			const downloadURL = await getDownloadURL(imageRef);

			//Actualiza el documento del post (postDocRef) con la URL de descarga (downloadURL) obtenida previamente, almacenándola en el campo imageURL.
			await updateDoc(postDocRef, { imageURL: downloadURL });

			//Actualiza el objeto newPost local con la URL de descarga de la imagen. Esto podría ser útil si necesitas hacer más operaciones con esta información en el lado del cliente.
			newPost.imageURL = downloadURL;

			if (userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id });

			if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id });

			showToast("Success", "Post created successfully", "success");
		} catch (error) {
			showToast("Error", `El error de image?: ${error.message}`, "error");
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleCreatePost };
}