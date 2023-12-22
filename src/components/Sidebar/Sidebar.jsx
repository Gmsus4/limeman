import { Box, Button, Flex, IconButton, Image, Link, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text, Tooltip, useColorMode } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { useLogout } from "../../hooks/useLogout";
import { SidebarItems } from "./SidebarItems";
import { BiLogOut } from "react-icons/bi";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ProfileLink } from "./ProfileLink";
import { ToogleDark } from "./ToogleDark";
import { Search } from "./Search";
import { CreatePost } from "./CreatePost";
import { Suggested } from "./Suggested";

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
            <Menu>
                <MenuButton  display={{base: 'flex', md: 'none'}}
                    as={IconButton}     
                    aria-label='Options'
                    icon={<HamburgerIcon />}
                    variant='outline'
                    color={"white"}
                >
                </MenuButton>
                <MenuList>
                    <MenuGroup title='Profile'>
                        <MenuItem gap={2} justifyContent={"space-evenly"}>
                            <ProfileLink />
                            <ToogleDark />
                        </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title='Options'>
                        <MenuItem alignItems={"center"} justifyContent={"space-evenly"}>
                            <Suggested />   
                            <Search color={"auto"}/>   
                            <CreatePost />   
                        </MenuItem>
                        <MenuItem>
                            <Button 
                                w={"full"}
                                ml={1}
                                gap={5}
                                onClick={handleLogout}
                                alignItems={"center"}
                            >
                                <BiLogOut size={25}/>
                                Logout
                            </Button>
                        </MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
            <Flex display={{base: 'none', md:'flex'}} direction={"row"} gap={5} cursor={"pointer"}>
                <SidebarItems />
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
                        mt={0}
                        p={2}
                        w={{base: 10, md: "full"}}
                        justifyContent={{base: "none", md: "flex-start"}}
                    >
                        <BiLogOut color="white" size={25} />
                        {/* <Button 
                            display={{base: "none", md: "block"}}
                            variant={"ghost"}
                            _hover={{bg: "transparent"}}
                            isLoading={isLogginOut}
                            color={"white"}
                        >
                            Logout
                        </Button> */}
                    </Flex>
                </Tooltip>
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
