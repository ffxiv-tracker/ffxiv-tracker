import React from 'react';
import moment from 'moment';
import { Box, Button, Flex, Heading, Menu, MenuButton, MenuDivider, MenuList, MenuItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, useToast, FormControl, FormLabel, Input, AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay, } from "@chakra-ui/react"
import { CloseIcon } from '@chakra-ui/icons'
import { Countdown } from './countdown';

export default function Timer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const storedTimers = JSON.parse(localStorage.getItem("timers"))
    const [newTimerName, setNewTimerName] = React.useState("");
    const [newTimerDays, setNewTimerDays] = React.useState("");
    const [newTimerHours, setNewTimerHours] = React.useState("");
    const [newTimerMinutes, setNewTimerMinutes] = React.useState("");
    const [editingTimer, setEditingTimer] = React.useState("");
    const [alertOpen, setAlertOpen] = React.useState(false);
    const cancelRef = React.useRef()
    const toast = useToast()
    const onAlertClose = () => setAlertOpen(false)

    const editTimer = (name) =>{
        setEditingTimer(name)
        setAlertOpen(true)

    }
    const removeTimer = () =>{
        const updatedTimers = storedTimers.filter((item) => item.name !== editingTimer);
        const stringTimer = JSON.stringify(updatedTimers)
        localStorage.setItem("timers", stringTimer);
        onAlertClose()
        toast({
            title: `${editingTimer} Timer Deleted`,
            status: "success",
            duration: 2000,
            isClosable: true,
          })

    }
    const onFinish = (event) => {
        event.preventDefault();
            var dt = moment();
            var dur = moment.duration({ days: newTimerDays, hours: newTimerHours, minutes: newTimerMinutes });
            const newDuration = dt.add(dur);
            const epoch = newDuration.unix()
            let timers = []
            if (storedTimers) {
                timers = storedTimers
            }
            let newTimer = {}
            Object.assign(newTimer, { name: newTimerName, days: newTimerDays, hours: newTimerHours, minutes: newTimerMinutes, duration: epoch });
            timers.push(newTimer)
            const stringTimer = JSON.stringify(timers)
            localStorage.setItem("timers", stringTimer);
            setNewTimerName("")
            setNewTimerDays(0)
            setNewTimerHours(0)
            setNewTimerMinutes(0)
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
                                    {storedTimers ? storedTimers.map((timer) => {
                                        return (
                                            <Box key={timer.name}>
                                                <MenuItem icon={<CloseIcon onClick={() => editTimer(timer.name)} />}>
                                                    <Box>
                                                        <Heading as="h5" size="sm">{timer.name}</Heading>
                                                        <Countdown eventTime={timer.duration} interval={60000} />
                                                    </Box>
                                                </MenuItem>
                                                <MenuDivider />
                                            </Box>)
                                    }) : null
                                    }
                                    <MenuItem onClick={onOpen}><Button bg="blue.700">Add New Timer</Button></MenuItem>
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
            <AlertDialog
                isOpen={alertOpen}
                leastDestructiveRef={cancelRef}
                onClose={onAlertClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Timer - {editingTimer}
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the timer? You can't undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onAlertClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={removeTimer} ml={3}>
                            Delete
                        </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>

    );
}
