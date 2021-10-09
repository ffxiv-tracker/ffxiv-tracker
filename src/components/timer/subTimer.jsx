import React from 'react';
import moment from 'moment';
import { Box, Button, Flex, Menu, MenuButton, MenuList, MenuItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Progress, useDisclosure, FormControl, FormLabel, Select, Input } from "@chakra-ui/react"
import {Countdown} from './countdown';

export default function Timer () {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const storedTimers = JSON.parse(localStorage.getItem("timers"))
    const [newTimerName, setNewTimerName] = React.useState("");
    const [newTimerDays, setNewTimerDays] = React.useState("");
    const [newTimerHours, setNewTimerHours] = React.useState("");
    const [newTimerMinutes, setNewTimerMinutes] = React.useState("");

    const onFinish = (event) => {
        event.preventDefault();
        var dt = moment();
        var dur = moment.duration({ days: newTimerDays, hours: newTimerHours, minutes: newTimerMinutes });
        const newDuration = dt.add(dur);
        const epoch = newDuration.unix()
        let timers = []
        if(storedTimers){
            timers = storedTimers
        }
        let newTimer = {}
        Object.assign(newTimer, { name: newTimerName, days: newTimerDays, hours: newTimerHours, minutes: newTimerMinutes, duration: epoch});
        timers.push(newTimer)
        const stringTimer = JSON.stringify(timers)
        localStorage.setItem("timers", stringTimer);
        onClose();
    };
    return (
        <Box>
            <Flex direction="row" align="center" justify="center">
                <Box className="header-row" justify="center">
                    <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton isActive={isOpen} as={Button}>
                                Timers
                            </MenuButton>
                            <MenuList>
                                {storedTimers ? storedTimers.map((timer)=>{
                                    console.log(timer.duration)
                                        return (
                                            <MenuItem >
                                                <Box>
                                                    {timer.name}
                                                    <Countdown key={timer.name} eventTime={timer.duration} interval={60000} />
                                                </Box>
                                            </MenuItem>)
                                    }) : null
                                }
                                <MenuItem onClick={onOpen}>Add New Timer</MenuItem>
                            </MenuList>
                        </>
                    )}
                    </Menu>
                </Box>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Sub Timer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={onFinish}>
                            <FormControl id="name" isRequired>
                                <FormLabel>Timer Name</FormLabel>
                                <Input placeholder="Timer Name" onChange={event => setNewTimerName(event.currentTarget.value)} />
                            </FormControl>
                            <FormControl id="days" isRequired>
                                <FormLabel>Days</FormLabel>
                                <Input placeholder="Days" onChange={event => setNewTimerDays(event.currentTarget.value)} />
                            </FormControl>
                            <FormControl id="hours" isRequired>
                                <FormLabel>Hours</FormLabel>
                                <Input placeholder="Hours" onChange={event => setNewTimerHours(event.currentTarget.value)} />
                            </FormControl>
                            <FormControl id="minutes" isRequired>
                                <FormLabel>Minutes</FormLabel>
                                <Input placeholder="Minutes" onChange={event => setNewTimerMinutes(event.currentTarget.value)} />
                            </FormControl>
                            <Button
                                mt={4}
                                colorScheme="blue"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>

    );
}
