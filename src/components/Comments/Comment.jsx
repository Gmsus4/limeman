    import { Avatar, Flex, Text } from "@chakra-ui/react"

    export const Comment = ({comment}) => {
    return (
        <Flex gap={2} my={2}>
            {/* <Avatar src={profilePic} name={username} size={"sm"}/>  */}
            <Flex flexDirection={"column"} gap={1} px={1}>
                <Flex gap={2}>
                    <Text fontWeight={"bold"} fontSize={12}>
                        {/* {username} */}
                    </Text>
                    <Text fontSize={12} color={"gray"}>
                        {/* {createAt} */}
                    </Text>
                </Flex>
                <Text fontSize={14}>
                    {comment.comment}
                </Text>
            </Flex>
        </Flex>
    )
}














{/*         <Flex flexDirection={"column"}>
            <Flex gap={2}>
                <Text fontWeight={"bold"} fontSize={12}>
                    {username}
                </Text>
                <Text fontSize={14}>
                    {text}
                </Text>
            </Flex>
            <Text fontSize={12} color={"gray"}>
                {createAt}
            </Text>
        </Flex> */}