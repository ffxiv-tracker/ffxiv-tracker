import React, {useEffect} from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    Spacer,
    Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, FormControl,
    FormLabel, Select, Input, useToast
} from "@chakra-ui/react"
import { CategoryTask } from './cardTypes';
import { useGetMasterTasksQuery, useSaveNewTasksMutation } from '../../services/tracker.ts'

export default function DailyTasks() {
    const { data, isLoading, isFetching } = useGetMasterTasksQuery();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newTask, setNewTask] = React.useState("");
    const [frequency, setFrequency] = React.useState(false);
    const [newUserTask] = useSaveNewTasksMutation();
    const toast = useToast()

    useEffect(() => {
        console.log("data", data)
    });

    const showAlert = (type) => {
        let title = ""
        switch (type) {
            case "custom":
                title = "Custom task successfully created"
                break;
            case "add":
                title = "Tasks successfully updated"
                break;
            default:
                break;
        }
        toast({
            title: title,
            status: "success",
            position: "top",
            duration: 2000,
            isClosable: true,
        })
    };

    const onFinish = (event, values) => {
        event.preventDefault();
        let customTasks = data.filter(t => t.frequency === frequency).reduce(function (newArr, task) {
            if (task.category === 'Custom') {
                task.tasks.map((subtask) => {
                    newArr.push(subtask.name);
                    return null
                })
                return newArr
            }
            return newArr;
        }, []);
        customTasks.push(newTask)
        const newTaskObject = {
            "category": "Custom",
            "frequency": frequency,
            "tasks": customTasks
        }
        newUserTask(newTaskObject)
        onClose();
        showAlert("custom");
    };

    return (
        isLoading ? <Spinner size="xl" /> : (
            <Box>
                <Box className="task-page" justify="center">
                    <Heading size="lg">Select items to add to your to-do list</Heading>
                    <Button className="task-button" onClick={onOpen} colorScheme="blue" size="lg">
                        Add New Task
                    </Button>
                </Box>
                <Box justify="center">
                    <Flex justify="center">
                        <Spacer />
                        <Box width="100%">
                            <Heading className="centered page-header">Daily Tasks</Heading>
                            {data.filter(t => t.frequency === 'Daily').map((task, index) => {
                                let names = []
                                let selected = []
                                task.tasks.map((task) => {
                                    names.push(task.name)
                                    if (task.selected === true) {
                                        selected.push(task.name)
                                    }
                                    return task
                                })
                                return (
                                    !isFetching && <CategoryTask key={index} category={task.category} taskNames={names} completeTasks={selected} tags={[]} frequency="Daily" type="master" showAlert={showAlert} />
                                )
                            })}
                        </Box>
                        <Spacer />
                        <Box width="100%">
                            <Heading className="centered page-header">Weekly Tasks</Heading>
                            {data.filter(t => t.frequency === 'Weekly').map((task, index) => {
                                let names = []
                                let selected = []
                                task.tasks.map((task) => {
                                    names.push(task.name)
                                    if (task.selected === true) {
                                        selected.push(task.name)
                                    }
                                    return task
                                })
                                return (
                                    !isFetching && <CategoryTask key={index} category={task.category} tasks={task.tasks} taskNames={names} completeTasks={selected} tags={[]} frequency="Weekly" type="master" showAlert={showAlert} />
                                )
                            })}
                        </Box>
                        <Spacer />
                    </Flex>
                </Box>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add a New Task</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form onSubmit={onFinish}>
                                <FormControl id="task" isRequired>
                                    <FormLabel>Task Name</FormLabel>
                                    <Input placeholder="Task Name" onChange={event => setNewTask(event.currentTarget.value)} />
                                </FormControl>
                                <FormControl id="frequency" isRequired>
                                    <FormLabel>Country</FormLabel>
                                    <Select placeholder="Select task frequency" onChange={event => setFrequency(event.currentTarget.value)}>
                                        <option>Daily</option>
                                        <option>Weekly</option>
                                    </Select>
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
                        <ModalFooter>
                            <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        )
    )
}