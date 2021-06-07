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
    const [masterDailyTasks, setMasterDailyTasks] = React.useState([]);
    const [masterWeeklyTasks, setMasterWeeklyTasks] = React.useState([]);
    const [currentDailyTasks, setCurrentDailyTasks] = React.useState({});
    const [currentWeeklyTasks, setCurrentWeeklyTasks] = React.useState({});
    const [currentDailyCategories, setCurrentDailyCategories] = React.useState([]);
    const [currentWeeklyCategories, setCurrentWeeklyCategories] = React.useState([]);
    function sortTasks(tasks, type){
        let currentDaily = {}
        let currentWeekly = {}
        let sortedDaily = []
        let sortedWeekly = []
        const currentDailyCategories = []
        const currentWeeklyCategories = []
        if(type === "current"){
            tasks.map((category)=>{
                if (category.frequency === "Daily"){
                    currentDailyCategories.push(category.category)
                    currentDaily[category.category] = category.tasks
                }
                if (category.frequency === "Weekly"){
                    currentWeeklyCategories.push(category.category)
                    currentWeekly[category.category] = category.tasks
                }
            })
            setCurrentDailyCategories(currentDailyCategories)
            setCurrentWeeklyCategories(currentWeeklyCategories)
            setCurrentDailyTasks(currentDaily)
            setCurrentWeeklyTasks(currentWeekly)
        }
        if(type === "master"){
            tasks.map((category)=>{
                if (category.frequency === "Daily"){
                    sortedDaily.push(category)
                }
                if (category.frequency === "Weekly"){
                    sortedWeekly.push(category)
                }
            })
            setMasterWeeklyTasks(sortedWeekly)
            setMasterDailyTasks(sortedDaily)
        }
    }

    function combineTasks(){
        let combinedDailyTasks = []
        let combinedWeeklyTasks = []
        masterDailyTasks.map((task)=>{
            let updatedCategory = {...task}
            if(currentDailyCategories.includes(task.category)){
                updatedCategory.currentTasks = currentDailyTasks[task.category]
            }
            combinedDailyTasks.push(updatedCategory)
        })
        masterWeeklyTasks.map((task)=>{
            let updatedCategory = {...task}
            if(currentWeeklyCategories.includes(task.category)){
                updatedCategory.currentTasks = currentWeeklyTasks[task.category]
            }
            combinedWeeklyTasks.push(updatedCategory)
        })

        setDailyTasks(combinedDailyTasks)
        setWeeklyTasks(combinedWeeklyTasks)
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const userResults = await axios(
                'https://hdnss8awo4.execute-api.us-west-2.amazonaws.com/user/tasks',
            );
            sortTasks(userResults.data, "current");
        };
        const fetchTaskData = async () => {
            const result = await axios(
                'https://hdnss8awo4.execute-api.us-west-2.amazonaws.com/tasks',
            );
            sortTasks(result.data, "master");
        };
        fetchUserData();
        fetchTaskData();
        combineTasks();
    }, []);

    return (
        <div className="tab-space">
            <Title level={3} className="centered task-page">Select items to add to your to-do list</Title>
            <Row className="task-page" justify="center">
                <Col span={10} className="ant-col-fix">
                    <Title level={2} className="centered">Daily Tasks</Title>
                    {dailyTasks.map((task, index) => {
                        return (
                            <CategoryTask key={index} category={task.category} tasks={task.tasks} currentTasks={task.currentTasks} tags={[]} type="master" frequency={task.frequency} />
                        )
                    })}
                </Col>
                <Col span={10} className="ant-col-fix">
                    <Title level={2} className="centered">Weekly Tasks</Title>
                    {weeklyTasks.map((task, index) => {
                        console.log('task', task)
                        return (
                            <CategoryTask key={index} category={task.category} tasks={task.tasks} currentTasks={task.currentTasks} tags={[]} type="master" frequency={task.frequency} />
                        )
                    })}
                </Col>
            </Row>
        </div>
        )
}