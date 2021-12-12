import React from 'react';
import { Box, Flex, Heading, List, ListIcon, ListItem, Spacer, Spinner } from "@chakra-ui/react"
import { CategoryTask } from  './cardTypes';
import { useGetUserTasksQuery } from '../../services/tracker.ts'
import { MdCheckBoxOutlineBlank } from "react-icons/md";


export default function TasksPage() {
    const {data, isLoading} = useGetUserTasksQuery();
    return (
        isLoading ? <Spinner size="xl" /> : (
            <Box className="task-page" justify="center">
                <Flex justify="center">
                    <Spacer />
                    <Box width="40%">
                        <Heading className="page-header">Daily Tasks</Heading>
                        <List spacing={3} className="parent-list">
                            {data.filter(t => t.frequency === 'Daily').map((task, index) => {
                                let names = []
                                let done = []
                                task.tasks.map((task)=>{
                                    names.push(task.name)
                                    if(task.done === true){
                                        done.push(task.name)
                                    }
                                })
                                return (
                                    <ListItem fontSize='3xl'>
                                        {task.category}
                                        <List className="child-list">
                                            {task.tasks.map((task)=>{
                                                return (<ListItem fontSize='2xl' className="child-list-item">
                                                    <ListIcon as={MdCheckBoxOutlineBlank} color='blue.700' />
                                                    {task.name}
                                                </ListItem>)
                                                })
                                            }
                                        </List>
                                    </ListItem>
                                )
                                // return (
                                //     <CategoryTask key={index} category={task.category} taskNames={names} completeTasks={done} tags={[]} frequency="Daily" type="" />
                                // )
                            })}
                        </List>
                    </Box>
                    <Spacer />
                    <Box width="40%" className="">
                        <Heading className="page-header">Weekly Tasks</Heading>
                        {data.filter(t => t.frequency === 'Weekly').map((task, index) => {
                            let names = []
                            let done = []
                            task.tasks.map((task)=>{
                                names.push(task.name)
                                if(task.done === true){
                                    done.push(task.name)
                                }
                                return task
                            })
                            return (
                                <CategoryTask key={index} category={task.category} tasks={task.tasks} taskNames={names} completeTasks={done} tags={[]} frequency="Weekly" type="" />
                            )
                        })}
                    </Box>
                    <Spacer />
                </Flex>
            </Box>
        )
    );
}