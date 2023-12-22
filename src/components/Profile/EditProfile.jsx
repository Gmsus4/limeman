import { Alert, AlertIcon, Avatar, Button, Center, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useShowToast } from "../../hooks/useShowToast";
import { useAuthStore } from "../../store/authStore";
import { usePreviewImg } from "../../hooks/usePreviewImg";
import { useEditProfile } from "../../hooks/useEditProfile";
import { useNavigate } from "react-router-dom";
import { useUsernameExists } from "../../hooks/useUsernameExists";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const validationSchema = Yup.object({
    username: Yup.string()
    .required('El nombre de usuario es obligatorio')
    .matches(/^[a-z0-9_]+$/, 'El nombre de usuario solo puede contener letras minúsculas, números y guiones bajos')
    .matches(/^\S*$/, 'El nombre de usuario no puede contener espacios en blanco')
    .min(3, '¡Demasiado corto!')
    .max(30, '¡Demasiado largo!'),

    fullName: Yup.string()
        .min(3, '¡Demasiado corto!')
        .max(63, '¡Demasiado largo!')
        .required('El nombre es requerido'),
    
    bio: Yup.string()
        .max(150, 'La biografía no puede exceder los 150 caracteres'),
        //.min(3, '¡Demasiado corto!'),
}).required();

export const EditProfile = ({ isOpen, onClose }) => {
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        bio: ''
    })

    const navigate = useNavigate();
    const authUser = useAuthStore((state) => state.user);
    const fileRef = useRef(null);
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
    const { isUpdating, editProfile} = useEditProfile();
    const { searchUsernameExist } = useUsernameExists();
    const showToast = useShowToast()

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const handleEditProfile = async (data) => {
        try {
            const isUsernameExisting = await searchUsernameExist(data.username);
            if (!isUsernameExisting) { //Si el username no existe
                await editProfile(data, selectedFile);
                setSelectedFile(null);
                onClose();
                data.username && navigate(`/${data.username}`);
            } else { //Si el username existe
                if(data.username === authUser.username){ //Si el valor del input del username es igual al valor del username del user autenticado
                    await editProfile(data, selectedFile); //Actualiza los datos (Edita los datos)
                    setSelectedFile(null);
                    onClose();
                    data.username && navigate(`/${data.username}`);
                } else{
                    //Si el valor del username autenticado es diferente al de la busqueda entones quiere decir que ese username ya existe
                    showToast('Error', 'Username already exists', 'error');
                }
            }
        } catch (error) {
            showToast('Error', error.message, 'error');
        }
    };
    
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent boxShadow={"xl"} mx={3}>
                    <ModalHeader />
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Container Flex */}
                        <Flex>
                            <Stack spacing={4} w={"full"} maxW={"md"} p={6} my={0}>
                                <Heading textAlign={"center"} color={"primary.100"} lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                                    Edit Profile
                                </Heading>
                                <FormControl>
                                    <Stack direction={["column", "row"]} spacing={6}>
                                        <Center>
                                            <Avatar size='xl' name={authUser.fullName} src={selectedFile || authUser.profilePicURL} />
                                        </Center>
                                        <Center w='full'>
                                            <Button onClick={() => fileRef.current.click()} w='full'>
                                                Edit Profile Picture
                                            </Button>
                                        </Center>
                                        <Input type="file" hidden ref={fileRef} onChange={handleImageChange}/>
                                    </Stack>
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={"sm"}>Full Name</FormLabel>
                                    <Input placeholder={register.fullName || authUser.fullName} size={"sm"} type={"text"}
                                        {...register("fullName")}
                                    />
                                    { errors.fullName?.message && (
                                        <Alert status="error" fontSize={10} p={1} borderRadius={4} w={"full"} my={2}>
                                            <AlertIcon fontSize={12} />
                                            {errors.fullName?.message}
                                        </Alert>
                                    )}
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={"sm"}>Username</FormLabel>
                                    <Input placeholder={register.username || authUser.username} size={"sm"} type={"text"}
                                        {...register("username")}
                                    />
                                    { errors.username?.message && (
                                        <Alert status="error" fontSize={10} p={1} borderRadius={4} w={"full"} my={2}>
                                            <AlertIcon fontSize={12} />
                                            {errors.username?.message}
                                        </Alert>
                                    )}
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={"sm"}>Bio</FormLabel>
                                    <Input placeholder={register.bio || authUser.bio} size={"sm"} type={"text"}
                                        {...register("bio")}
                                    />
                                    { errors.bio?.message && (
                                        <Alert status="error" fontSize={10} p={1} borderRadius={4} w={"full"} my={2}>
                                            <AlertIcon fontSize={12} />
                                            {errors.bio?.message}
                                        </Alert>
                                    )}
                                </FormControl>

                                <Stack spacing={6} direction={["column", "row"]}>
                                    <Button
                                        bg={"red.400"}
                                        color={"whiteAlpha.900"}
                                        w='full'
                                        size='sm'
                                        _hover={{ bg: "red.500" }}
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        bg={"primary.100"}
                                        color={"whiteAlpha.900"}
                                        size='sm'
                                        w='full'
                                        _hover={{ bg: "primary.900" }}
                                        onClick={handleSubmit(handleEditProfile)}
                                        isLoading={isUpdating}
                                    >
                                        Submit
                                    </Button>
                                </Stack>
                            </Stack>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
