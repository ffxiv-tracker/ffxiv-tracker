import React from 'react';
import {
    Alert,
    AlertIcon,
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
    FormLabel, Select, Input
} from "@chakra-ui/react"
import { CategoryTask } from './cardTypes';
import { useGetMasterTasksQuery, useSaveNewTasksMutation } from '../../services/tracker.ts'

export default function DailyTasks() {
    const { data, isLoading } = useGetMasterTasksQuery();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newTask, setNewTask] = React.useState("");
    const [frequency, setFrequency] = React.useState(false);
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);
    const [newUserTask] = useSaveNewTasksMutation();

    const showAlert = () => {
        setCustomAlertVisible(true);
        setTimeout(() => { setCustomAlertVisible(false); }, 3000);
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
        showAlert();
    };

    return (
        isLoading ? <Spinner size="xl" /> : (
            <Box>
                <Box className="task-page" justify="center">
                    <Heading>Select items to add to your to-do list</Heading>
                    <Button className="task-button" onClick={onOpen} colorScheme="blue" size="lg">
                        Add New Task
                    </Button>
                </Box>
                {customAlertVisible ? <Alert status="success"><AlertIcon />Custom task successfully added</Alert> : null
                }
                <Box justify="center">
                    <Flex>
                        <Spacer />
                        <Box>
                            <Heading className="centered">Daily Tasks</Heading>
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
                                    <CategoryTask key={index} category={task.category} taskNames={names} completeTasks={selected} tags={[]} frequency="Daily" type="master" />
                                )
                            })}
                        </Box>
                        <Spacer />
                        <Box>
                            <Heading className="centered">Weekly Tasks</Heading>
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
                                    <CategoryTask key={index} category={task.category} tasks={task.tasks} taskNames={names} completeTasks={selected} tags={[]} frequency="Weekly" type="master" />
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