import { Avatar, Box, Flex, Image, Link, Tooltip } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { CreatePostLogo, NotificationsLogo, SearchLogo } from "../../assets/constants"
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

export const Sidebar = () => {
    const sidebarItems = [
        {
            icon: <AiFillHome size={25} />,
            text: "Home",
            link: "/"
        },
        {
            icon: <SearchLogo/>,
            text: "Search",
        },
        {
            icon: <NotificationsLogo/>,
            text: "Notifications",
        },
        {
            icon: <CreatePostLogo/>,
            text: "Create",
        },
        {
            icon: <Avatar size={"sm"} name="Fernando Gomez" src="/google.png"/>,
            text: "Profile",
            link: "/fernandog"
        },
    ]
  return (
    <Box 
        height={"100vh"} 
        borderRight={"1px solid"}
        borderColor={"gray"}
        py={8}
        position={"sticky"}
        top={0}
        left={0}
        px={{base:2, md: 4}}
    >
        <Flex direction={"column"} gap={10} w={"full"} height={"full"} alignItems={{base: "center", md: "start"}}>
            <Link to={"/"} as={RouterLink} pl={2} display={{base: "none", md: "block"}} cursor={"pointer"}>
                <Image src="https://res.cloudinary.com/dozzu7xhx/image/upload/v1702058306/Logos/logoSuccessWhite_i7rbyx.png"/>
            </Link>
            <Link alignItems={"center"} to={"/"} as={RouterLink} pl={2} display={{base: "block", md: "none"}}
            borderRadius={6}
            _hover={{
                bg: "green"
            }}
            w={{base: 10}}
            cursor={"pointer"}>
                <Image src="https://res.cloudinary.com/dozzu7xhx/image/upload/v1702058636/Logos/logoOneX_edsiee.png"/>
            </Link>
            <Flex direction={"column"} gap={5} cursor={"pointer"}>
                {sidebarItems.map((item, index) => (
                    <Tooltip 
                        key={index}
                        hasArrow
                        label={item.text}
                        placement="right"
                        ml={1}
                        openDelay={500}
                        display={{base: "block", md: "none"}}
                    >
                        <Link 
                            display={"flex"}
                            to={item.link || null}
                            as={RouterLink}
                            alignItems={"center"}
                            gap={4}
                            _hover={{bg: "whiteAlpha.400"}}
                            borderRadius={6}
                            p={2}
                            w={{base: 10, md: "full"}}
                            justifyContent={{base: "center", md: "flex-start"}}
                        >
                            {item.icon}
                            <Box display={{base: "none", md: "block"}}>
                                {item.text}
                            </Box>
                        </Link>
                    </Tooltip>
                ))}
            </Flex>
            <Tooltip 
                hasArrow
                label={"Logout"}
                placement="right"
                ml={1}
                openDelay={500}
                display={{base: "block", md: "none"}}
            >
                <Link 
                    display={"flex"}
                    to={"/auth"}
                    as={RouterLink}
                    alignItems={"center"}
                    gap={4}
                    _hover={{bg: "whiteAlpha.400"}}
                    borderRadius={6}
                    p={2}
                    mt={"auto"}
                    w={{base: 10, md: "full"}}
                    justifyContent={{base: "none", md: "flex-start"}}
                >
                    <BiLogOut size={25} />
                    <Box display={{base: "none", md: "block"}}>Logout</Box>
                </Link>
            </Tooltip>
        </Flex>
    </Box>
  )
}
