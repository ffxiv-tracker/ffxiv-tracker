import React, { useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Typography } from 'antd';
import { CategoryTask } from  './cardTypes';
const { Title } = Typography;

//TODO: Add function to reassemble values into a list to submit via api. Iterate through name property, and for each,
//create a new object with the current objects properties and current name

export default function DailyTasks() {
    const [dailyTasks, setDailyTasks] = React.useState([]);
    const [weeklyTasks, setWeeklyTasks] = React.useState([]);
    function sortTasks(tasks, frequency){
        let sortedDaily = []
        let sortedWeekly = []
        tasks.map((category)=>{
            if (category.frequency === "Weekly"){
                sortedWeekly.push(category)
            }
            if (category.frequency === "Daily"){
                sortedDaily.push(category)
            }
        })
        console.log("daily", sortedDaily)
        console.log("weekly", sortedWeekly)
        setWeeklyTasks(sortedWeekly)
        setDailyTasks(sortedDaily)
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://api.beta.ffxiv.anid.dev/tasks',
            );
            sortTasks(result.data);
        };
        fetchData();
    }, []);


    return (
        <div className="tab-space">
            <Title level={3} className="centered task-page">Select items to add to your to-do list</Title>
            <Row className="task-page" justify="center">
                <Col span={10} className="ant-col-fix">
                    <Title level={2} className="centered">Daily Tasks</Title>
                    {dailyTasks.map((task, index) => {
                        return (
                            <CategoryTask key={index} category={task.category} tasks={task.tasks} tags={[]} type="master" />
                        )
                    })}
                </Col>
                <Col span={10} className="ant-col-fix">
                    <Title level={2} className="centered">Weekly Tasks</Title>
                    {weeklyTasks.map((task, index) => {
                        return (
                            <CategoryTask key={index} category={task.category} tasks={task.tasks} tags={[]} type="master" />
                        )
                    })}
                </Col>
            </Row>
        </div>
        )
}