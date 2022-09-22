import React from 'react';
import { Box, Flex, Heading, Spacer, Spinner } from "@chakra-ui/react"
import { CategoryTask } from  './cardTypes';
import { useGetUserTasksQuery } from '../../services/tracker.ts'


export default function TasksPage() {
    const {data, isLoading} = useGetUserTasksQuery();
    return (
        isLoading ? <Spinner size="xl" /> : (
            <Box className="task-page" justify="center">
                <Flex justify="center">
                    <Spacer />
                    <Box width="40%">
                        <Heading className="page-header">Daily Tasks</Heading>
                        <Box borderWidth='1px' padding="3% 0"  borderRadius='lg'>
                            {data.filter(t => t.frequency === 'Daily').map((task, index) => {
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
                                    <CategoryTask key={index} category={task.category} taskNames={names} completeTasks={done} tags={[]} frequency="Daily" type="" />
                                )
                            })}
                        </Box>
                    </Box>
                    <Spacer />
                    <Box width="40%" className="">
                        <Heading className="page-header">Weekly Tasks</Heading>
                        <Box borderWidth='1px' padding="3% 0" borderRadius='lg'>
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
                    </Box>
                    <Spacer />
                </Flex>
            </Box>
        )
    );
}