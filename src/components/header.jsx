import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import jwt_decode from "jwt-decode";
import Timer from '../components/timer/subTimer'

export default function NavHeader () {
    const jwt = localStorage.getItem("jwt")
    let decodedValue
    if(jwt){
        decodedValue = jwt_decode(jwt);
    }
    return (
        <Box className="header" w="100%" bg="gray.700">
            <Flex>
                <Box className="header-row" justify="center"  width="15%">
                    <Image className="logo" src={`/images/tomestone-cropped.png`} alt="Logo" />
                </Box>
                <Flex grow="1" direction="row" align="center" justify="center" width="35%">
                    <Box w="40%">
                        <Flex direction="row" align="center" justify="space-between">
                            <Link className="header-text" to="/tasks"><Text fontSize={{ base: "sm", sm: "sm", md: "lg", lg: "lg" }}>Tasks</Text></Link>
                            <Link className="header-text" to="/master-tasks"><Text fontSize={{ base: "sm", sm: "sm", md: "lg", lg: "lg" }}>Edit</Text></Link>
                            <Link className="header-text" to="/links"><Text fontSize={{ base: "sm", sm: "sm", md: "lg", lg: "lg" }}>Links</Text></Link>
                            <Timer />
                        </Flex>
                    </Box>
                </Flex>
                <Flex className="avatar-block" direction="row" align="center">
                    {jwt ? <Box>
                        <Flex direction="row" align="center">
                        <Text className ="avatar-username" fontSize={{ base: "sm", sm: "sm", md: "md", lg: "md" }}>{decodedValue.username}</Text>
                            <Avatar name={decodedValue.username} size={"md"} src={`https://cdn.discordapp.com/avatars/${decodedValue.id}/${decodedValue.avatar}.png`} />
                        </Flex>
                    </Box> : null}
                </Flex>

            </Flex>
        </Box>

    );
}
