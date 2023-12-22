import { Box, Button, Flex, Image, Link, Text, Tooltip } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { useLogout } from "../../hooks/useLogout";
import { SidebarItems } from "./SidebarItems";
import { BiLogOut } from "react-icons/bi";

export const Sidebar = () => {
  const { handleLogout, isLogginOut } = useLogout();

  return (
    <Box backgroundColor={"primary.100"} w={"full"} h={"60px"}>
        <Flex alignItems={"center"} px={10} height={"inherit"} justifyContent={"space-between"}>
            <Link to={"/"} as={RouterLink} pl={2} display={{base: "none", md: "block"}} cursor={"pointer"}>
                <Image height={"50px"} src="https://res.cloudinary.com/dozzu7xhx/image/upload/v1702058306/Logos/logoSuccessWhite_i7rbyx.png" alt=""/>
            </Link>
            <Link pl={0} alignItems={"center"} to={"/"} as={RouterLink} display={{base: "block", md: "none"}}
                borderRadius={6}
                _hover={{
                    bg: "green"
                }}
                w={{base: 10}}
                cursor={"pointer"}>
                    <Image src="https://res.cloudinary.com/dozzu7xhx/image/upload/v1703221030/Logos/logoOneWhite_vsdkwy.png"/>
            </Link>
            <Flex direction={"row"} gap={5} cursor={"pointer"}>
                <SidebarItems />
            </Flex>
        </Flex>
    </Box>
/*     <Box 
        borderRight={"1px solid"}
        borderColor={"gray"}
        py={8}
        position={"sticky"}
        top={0}
        left={0}
        px={{base:2, md: 4}}
    >
        <Flex direction={"row"} gap={10} w={"full"} height={"full"} alignItems={{base: "center", md: "start"}}>
            <Link to={"/"} as={RouterLink} pl={2} display={{base: "none", md: "block"}} cursor={"pointer"}>
                <Image src="https://res.cloudinary.com/dozzu7xhx/image/upload/v1702058306/Logos/logoSuccessWhite_i7rbyx.png"/>
            </Link>
            <Link pl={0} alignItems={"center"} to={"/"} as={RouterLink} display={{base: "block", md: "none"}}
            borderRadius={6}
            _hover={{
                bg: "green"
            }}
            w={{base: 10}}
            cursor={"pointer"}>
                <Image src="https://res.cloudinary.com/dozzu7xhx/image/upload/v1702058636/Logos/logoOneX_edsiee.png"/>
            </Link>
            <Flex direction={"column"} gap={5} cursor={"pointer"}>
                <SidebarItems />
            </Flex>

            <Tooltip 
                hasArrow
                label={"Logout"}
                placement="right"
                ml={1}
                openDelay={500}
                display={{base: "block", md: "none"}}
            >
                <Flex 
                    onClick={handleLogout}
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
                    <Button 
                        display={{base: "none", md: "block"}}
                        variant={"ghost"}
                        _hover={{bg: "transparent"}}
                        isLoading={isLogginOut}
                    >
                        Logout
                    </Button>
                </Flex>
            </Tooltip>
        </Flex>
    </Box> */
  )

/*   <Image src="https://res.cloudinary.com/dozzu7xhx/image/upload/v1702058306/Logos/logoSuccessWhite_i7rbyx.png"/>
  <Image src="https://res.cloudinary.com/dozzu7xhx/image/upload/v1702058636/Logos/logoOneX_edsiee.png"/> */
}
