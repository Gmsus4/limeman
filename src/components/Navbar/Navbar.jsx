import { Button, Container, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<Container maxW={"container.lg"} my={4} mb={0}>
			<Flex w={"full"} justifyContent={{ base: "center", sm: "space-between" }} alignItems={"center"}>
				<Image 
                    src='https://res.cloudinary.com/dozzu7xhx/image/upload/v1702058306/Logos/logoSuccessWhite_i7rbyx.png' 
                    h={20} display={{ base: "none", sm: "block" }} cursor={"pointer"}
                />
				<Flex gap={4}>
					<Link to='/auth'>
						<Button colorScheme={"blue"} size={"sm"}>
							Login
						</Button>
					</Link>
					<Link to='/auth'>
						<Button variant={"outline"} size={"sm"}>
							Signup
						</Button>
					</Link>
				</Flex>
			</Flex>
		</Container>
	);
};