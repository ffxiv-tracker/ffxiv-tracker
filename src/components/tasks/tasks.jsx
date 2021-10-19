import React from 'react';
import {Box, Flex, Heading, Skeleton, Spacer, Stack} from "@chakra-ui/react"
import {CategoryTask} from './cardTypes';
import {useGetUserTasksQuery} from '../../services/tracker.ts'

const loadingVisual = (
    <Stack>
        <Skeleton height="20px"/>
        <Skeleton height="20px"/>
        <Skeleton height="20px"/>
    </Stack>
);

export default function TasksPage() {
    const {data, isLoading} = useGetUserTasksQuery();
    return (
        <Box className="task-page" justify="center">
            <Flex justify="center">
                <Spacer/>
                <Box width="40%">
                    <Heading className="page-header">Daily Tasks</Heading>
                    {isLoading ? loadingVisual : data.filter(t => t.frequency === 'Daily').map((task, index) => {
                        let names = []
                        let done = []
                        task.tasks.map((task) => {
                            names.push(task.name)
                            if (task.done === true) {
                                done.push(task.name)
                            }
                            return task
                        })
                        return (
                            <CategoryTask key={index} category={task.category} taskNames={names} completeTasks={done}
                                          tags={[]} frequency="Daily" type=""/>
                        )
                    })}
                </Box>
                <Spacer/>
                <Box width="40%" className="">
                    <Heading className="page-header">Weekly Tasks</Heading>
                    {isLoading ? loadingVisual : data.filter(t => t.frequency === 'Weekly').map((task, index) => {
                        let names = []
                        let done = []
                        task.tasks.map((task) => {
                            names.push(task.name)
                            if (task.done === true) {
                                done.push(task.name)
                            }
                            return task
                        })
                        return (
                            <CategoryTask key={index} category={task.category} tasks={task.tasks} taskNames={names}
                                          completeTasks={done} tags={[]} frequency="Weekly" type=""/>
                        )
                    })}
                </Box>
                <Spacer/>
            </Flex>
        </Box>
    );
}