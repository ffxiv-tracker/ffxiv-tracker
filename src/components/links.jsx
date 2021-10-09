import React from 'react';
import { Box, Button, Center, Flex } from "@chakra-ui/react"

export default function SplashPage() {
    return (
        <Center>
            <Box className="container link-page" width="50%">
                <Flex align="center" direction="column">
                    <a className="link-button" href="https://docs.google.com/spreadsheets/d/1mJqzs3HsbVCC7O51CSnfjc-Kb72qaRkhNJQIfjIUFPk/edit#gid=0" target="_blank" rel="noreferrer" >
                        <Button colorScheme="blue" size="lg" height="70px" >
                            Wondrous Tales
                        </Button>
                    </a>
                    <a className="link-button" href="https://docs.google.com/spreadsheets/d/1SHwqauem0KAw7pW0_qvajU9DF_HKsSUh9Mbt-dYTgJY/edit#gid=1147333649" target="_blank" rel="noreferrer" >
                        <Button colorScheme="blue" size="lg" height="70px">
                            Mounts/Minions
                        </Button>
                    </a>
                    <a className="link-button" href="https://www.digitaltrends.com/gaming/ffxiv-ocean-fishing-guide-mount-minion-spectral-current-tips/" target="_blank" rel="noreferrer" >
                        <Button colorScheme="blue" size="lg" height="70px">
                            Ocean Fishing
                        </Button>
                    </a>
                    <a className="link-button" href="http://ffxivsquadron.com/" target="_blank" rel="noreferrer" >
                        <Button colorScheme="blue" size="lg" height="70px">
                            Squadron Tips
                        </Button>
                    </a>
                </Flex>
            </Box>
        </Center>
    )
}