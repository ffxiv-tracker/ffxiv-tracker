import React, { useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Typography } from 'antd';
import { CategoryTask } from  './cardTypes';
const { Title } = Typography;

export default function DailyTasks() {
    const [combinedTasks, setCombinedTasks] = React.useState([]);

    function combineTasks(userData, masterData){
        let currentTasks = {}
        const currentTaskCategories = []
        let updatedTasks = []
        userData.map((task)=>{
            currentTaskCategories.push(task.category)
            currentTasks[task.category] = task.tasks
        })
        masterData.map((task)=>{
            let updatedCategory = {...task}
            if(currentTaskCategories.includes(task.category)){
                updatedCategory.currentTasks = currentTasks[task.category]
            }
            updatedTasks.push(updatedCategory)
        })
        setCombinedTasks(updatedTasks)
    }

    useEffect(() => {
        async function getData(){
            const fetchUserData = async () => {
                const userResults = await axios(
                    'https://hdnss8awo4.execute-api.us-west-2.amazonaws.com/user/tasks',
                );
                return userResults.data;
            };
            const fetchTaskData = async () => {
                const result = await axios(
                    'https://hdnss8awo4.execute-api.us-west-2.amazonaws.com/tasks',
                );
                return result.data;
            };
            const user = await fetchUserData();
            const master = await fetchTaskData();
            combineTasks(user, master);
        }
        getData();
    }, []);

    return (
        <div className="tab-space">
            <Title level={3} className="centered task-page">Select items to add to your to-do list</Title>
            <Row className="task-page" justify="center">
                <Col span={10} className="ant-col-fix">
                    <Title level={2} className="centered">Daily Tasks</Title>
                    {combinedTasks.filter(t => t.frequency === 'Daily').map((task, index) => {
                        return (
                            <CategoryTask key={index} category={task.category} tasks={task.tasks} currentTasks={task.currentTasks} tags={[]} type="master" frequency={task.frequency} />
                        )
                    })}
                </Col>
                <Col span={10} className="ant-col-fix">
                    <Title level={2} className="centered">Weekly Tasks</Title>
                    {combinedTasks.filter(t => t.frequency === 'Weekly').map((task, index) => {
                        return (
                            <CategoryTask key={index} category={task.category} tasks={task.tasks} currentTasks={task.currentTasks} tags={[]} type="master" frequency={task.frequency} />
                        )
                    })}
                </Col>
            </Row>
        </div>
        )
}