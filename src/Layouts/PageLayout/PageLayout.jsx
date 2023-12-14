import { Box, Flex, Spinner } from "@chakra-ui/react"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { Navbar } from "../../components/Navbar/Navbar";

export const PageLayout = ({children}) => {
    const {pathname} = useLocation();
    const [user, loading, error] = useAuthState(auth);
    const canRenderSidebar = pathname !== '/auth' && user;
    const canRenderNavbar = !user && !loading && pathname !== '/auth'; //Solo si el usuario no esta autenticado, si la ruta no apunta al auth

    const checkingUserIsAuth = !user && loading;
    if(checkingUserIsAuth) return <PageLayoutSpinner />

    return (
        <Flex flexDir={canRenderNavbar ? "column" : "row"}>
            {/* SIDEBAR ON THE LEFT */}

            {canRenderSidebar ? ( //Si el pathname es distinto al auth entonces muestra el componente del sidebar
                <Box w={{base: "70px", md: "240px"}}>
                    <Sidebar />
                </Box>
            ) : null}

            {/* NAVBAR */}
            {canRenderNavbar ? <Navbar /> : null}

            {/* THE PAGE CONTENT ON THE RIGHT */}
            <Box flex={1} w={{base: "calc(100% - 70px)", md: "calc(100% - 240px)"}} mx={"auto"}>
                {children}
            </Box>
        </Flex>
    )
}


const PageLayoutSpinner = () => {
    return(
        <Flex flexDir={"column"} h={"100vh"} alignItems={"center"} justifyContent={'center'} >
            <Spinner size='xl' />
        </Flex>
    )
}