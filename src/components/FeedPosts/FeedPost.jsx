import { Box, Image } from "@chakra-ui/react"
import { PostHeader } from "./PostHeader"
import { PostFooter } from "./PostFooter"

export const FeedPost = ({img, username, avatar}) => {
  return (
    <>
        <PostHeader username={username} avatar={avatar}/>
        <Box my={4} borderRadius={10} overflow={"hidden"}>
            <Image w={"full"} src={img} alt={username}/>
        </Box>
        <PostFooter username={username}/>
    </>
  )
}
