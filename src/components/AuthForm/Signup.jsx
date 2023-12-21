import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react";
import { useSignUpWithEmailAndPassword } from "../../hooks/useSignUpWithEmailAndPassword";
import * as Yup from 'yup';
import { useShowToast } from "../../hooks/useShowToast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object({ //SOLO LOS SCHEMA NECESARIOS PARA LA VALIDACION
    email: Yup.string()
    .email('Correo inválido') // Verifica que sea un correo electrónico válido
    .required('El correo es requerido'), // Asegura que el campo no esté vacío

    username: Yup.string()
    .required('El nombre de usuario es obligatorio') // Asegura que el campo no esté vacío
    .matches(/^[a-zA-Z0-9_]+$/, 'El nombre de usuario solo puede contener letras, números y guiones bajos') // Verifica que el username contenga solo letras, números y guiones bajos
    .matches(/^\S*$/, 'El nombre de usuario no puede contener espacios en blanco') // Asegura que no haya espacios en blanco
    .min(3, '¡Demasiado corto!') // Verifica que el nombre tenga al menos 2 caracteres
    .max(30, '¡Demasiado largo!'), // Verifica que el nombre no exceda los 50 caracteres
        
    fullName: Yup.string()
    .min(3, '¡Demasiado corto!') // Verifica que el nombre tenga al menos 2 caracteres
    .max(63, '¡Demasiado largo!') // Verifica que el nombre no exceda los 50 caracteres
    .required('El nombre es requerido'), // Asegura que el campo no esté vacío

    password: Yup.string()
    .required('No se ha proporcionado contraseña.') // Asegura que el campo no esté vacío
    .min(8, 'La contraseña es demasiado corta, debe tener al menos 8 caracteres.') // Verifica que la contraseña tenga al menos 8 caracteres
    .matches(/[a-zA-Z]/, 'La contraseña solo puede contener letras latinas.'), // Verifica que la contraseña contenga solo letras latinas 
}).required();// Requiere que todos los campos sean proporcionados

export const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { loading, error, signup } = useSignUpWithEmailAndPassword();

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = ( data ) => {
        console.log(data);
        const dataInfo = {
          ...data,
          email: data.email.toLowerCase(),
          userName: data.username.toLowerCase(),
          displayName: data.firstName
        }
        console.log(dataInfo);
        signup(dataInfo);
    }

    return (
        <>
            <Input 
                placeholder="Email" 
                fontSize={14} 
                type="email"
                size={"sm"}
                {...register("email")}
            />
            { errors.email?.message && (
                <Alert status="error" fontSize={10} p={1} borderRadius={4} w={"full"}>
                    <AlertIcon fontSize={12} />
                    {errors.email?.message}
                </Alert>
            )}
            <Input 
                placeholder="Username"
                fontSize={14}
                type="text"
                size={"sm"}
                {...register("username")}
            />
            { errors.username?.message && (
                <Alert status="error" fontSize={10} p={1} borderRadius={4} w={"full"}>
                    <AlertIcon fontSize={12} />
                    {errors.username?.message}
                </Alert>
            )}
            <Input 
                placeholder="Full Name"
                fontSize={14}
                type="text"
                size={"sm"}
                {...register("fullName")}
            />
            { errors.fullName?.message && (
                <Alert status="error" fontSize={10} p={1} borderRadius={4} w={"full"}>
                    <AlertIcon fontSize={12} />
                    {errors.fullName?.message}
                </Alert>
            )}
            <InputGroup>
                <Input 
                    placeholder="Password"
                    fontSize={14}
                    type={showPassword ? 'text' : 'password'}
                    size={"sm"}
                    {...register("password")}
                />
                <InputRightElement h={"full"}>
                    <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            { errors.password?.message && (
                <Alert status="error" fontSize={10} p={1} borderRadius={4} w={"full"}>
                    <AlertIcon fontSize={12} />
                    {errors.password?.message}
                </Alert>
            )}

            {error && (
                <Alert status="error" fontSize={13} p={2} borderRadius={4}>
                    <AlertIcon fontSize={12} />
                    {error.message}
                </Alert>
            )}
            
            <Button w={"full"} colorScheme="green" size={"sm"} fontSize={14} 
                isLoading={loading}
                onClick={handleSubmit(onSubmit)}
                >
                Sign Up
            </Button>
        </>
    )
}
