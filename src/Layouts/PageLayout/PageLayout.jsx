import { Box, Flex } from "@chakra-ui/react"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"

export const PageLayout = ({children}) => {
    const {pathname} = useLocation();

    return (
        <Flex>
            {/* SIDEBAR ON THE LEFT */}

            {pathname !== '/auth' ? ( //Si el pathname es distinto al auth entonces muestra el componente del sidebar
                <Box w={{base: "70px", md: "240px"}}>
                    <Sidebar />
                </Box>
            ) : null}

            {/* THE PAGE CONTENT ON THE RIGHT */}
            <Box flex={1} w={{base: "calc(100% - 70px)", md: "calc(100% - 240px)"}}>
                {children}
            </Box>
        </Flex>
    )
}
