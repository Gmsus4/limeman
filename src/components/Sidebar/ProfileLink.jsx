import { Link, Avatar, Box, Tooltip } from "@chakra-ui/react"
import { useAuthStore } from "../../store/authStore"
import { Link as RouterLink } from "react-router-dom"

export const ProfileLink = () => {
    const authUser = useAuthStore((state) => state.user);
  return (
    <Tooltip
        hasArrow
        label={"Profile"}
        placement='right'
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
    >
        <Link
            display={"flex"}
            to={`/${authUser?.username}`}
            as={RouterLink}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            justifyContent={{ base: "center", md: "flex-start" }}
        >
            <Avatar name={authUser?.fullName} size={"sm"} src={authUser?.profilePicURL || ""} />
        </Link>
    </Tooltip>
  )
}
