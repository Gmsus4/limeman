import { Avatar, Flex, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useUserProfileStore } from "../../store/userProfileStore"
import { timeAgo } from "../../utils/timeAgo";

export const Caption = ({post}) => {
    const userProfile = useUserProfileStore(state => state.userProfile);
    return (
        <Flex gap={2} my={2}>
        <Link to={`/${userProfile.username}`}>
            <Avatar src={userProfile.profilePicURL} name={userProfile.fullName} size={"sm"}/> 
        </Link>
        <Flex flexDirection={"column"} gap={1} px={1}>
            <Flex gap={2}>
                <Link to={`/${userProfile.username}`}>
                    <Text fontWeight={"bold"} fontSize={12}>
                        {userProfile.username}
                    </Text>
                </Link>
                <Text fontSize={12} color={"gray"}>
                    {timeAgo(post.createdAt)}
                </Text>
            </Flex>
            <Text fontSize={14}>
                {post.caption}
            </Text>
        </Flex>
    </Flex>
    )
}
