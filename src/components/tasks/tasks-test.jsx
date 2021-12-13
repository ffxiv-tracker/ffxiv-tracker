import React from 'react';
import { Box, Container, Flex, Heading, List, ListIcon, ListItem, Spacer, Spinner, Wrap, WrapItem } from "@chakra-ui/react"
import { CategoryTask } from  './cardTypes';
import { useGetUserTasksQuery } from '../../services/tracker.ts'
import { MdCheckBoxOutlineBlank } from "react-icons/md";


export default function TasksPage() {
    const {data, isLoading} = useGetUserTasksQuery();
    return (
        isLoading ? <Spinner size="xl" /> : (
            <Box className="task-page" justify="center">
                {/* <Flex width="100%" justify="center"> */}
                    {/* <Spacer /> */}
                    <Wrap justify="center">
                        <WrapItem width={[
                                    '100%', // 0-30em
                                    '100%', // 30em-48em
                                    '40%', // 48em-62em
                                    '40%', // 62em+
                                ]} justifyContent="center">
                            <Box width="80%" justify="center">
                                <Heading className="page-header">Daily Tasks</Heading>
                                <Box width="80%" className="list-box" borderWidth='1px' borderRadius='lg'>
                                    <List spacing={3} className="parent-list" justify="center">
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
                                                <ListItem className="list-center" fontSize='3xl'>
                                                    {task.category}
                                                    <List className="child-list" justify="space-between">
                                                        {task.tasks.map((task)=>{
                                                            return (<ListItem color='black'  borderWidth='1px' borderRadius='lg' fontSize='2xl' className="child-list-item" justify="center" >
                                                                {task.name}
                                                                <ListIcon className="child-list-icon" as={MdCheckBoxOutlineBlank} color='black' />
                                                                
                                                            </ListItem>)
                                                            })
                                                        }``
                                                    </List>
                                                </ListItem>
                                            )
                                            // return (
                                            //     <CategoryTask key={index} category={task.category} taskNames={names} completeTasks={done} tags={[]} frequency="Daily" type="" />
                                            // )
                                        })}
                                    </List>
                                </Box>
                            </Box>
                        </WrapItem>
                        {/* <Spacer /> */}
                        <WrapItem  width={[
                                    '100%', // 0-30em
                                    '100%', // 30em-48em
                                    '40%', // 48em-62em
                                    '40%', // 62em+
                                ]}>
                            <Box className="" justify="center">
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
                        </WrapItem>
                        
                    </Wrap>
                    
                    {/* <Spacer /> */}
                {/* </Flex> */}
            </Box>
        )
    );
}