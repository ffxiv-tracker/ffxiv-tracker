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
        let taskList = []
        let sortedTasks = []
        const sortedByCategory = tasks.reduce((acc, task) => {
            acc[task.category] ? acc[task.category].push(task) : acc[task.category] = [task];
            return acc;
        }, {});
        const keys = Object.keys(sortedByCategory)
        keys.map((key)=>{
            taskList.push(sortedByCategory[key])
            return key;
        })
        taskList.map((array)=>{
            console.log('array', array)
            let object = {
                "name": [],
                "category": "",
                "frequency": "",
                "orphan": false
            }
            if(array[0].category === null){
                object.category = array[0].name
                object.frequency = array[0].frequency
                object.orphan = true
                sortedTasks.push(object)
            } else {
                let names = []
                object.category = array[0].category
                object.frequency = array[0].frequency
                object.orphan = false
                array.map((task)=>{
                    names.push(task.name)
                    return task;
                })
                object.name = names
                sortedTasks.push(object)
            }
            return array;
        })
        if(frequency === "Weekly"){
            setWeeklyTasks(sortedTasks)
        } else {
            setDailyTasks(sortedTasks)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://34.219.238.37/tasks',
            );
            function weeklyFilter(item){
                if (item.frequency === "Weekly") {
                    return true
                }
            }
            function dailyFilter(item){
                if (item.frequency === "Daily") {
                    return true
                }
            }
            function filterTasks(tasks){
                const weekly = tasks.filter(weeklyFilter)
                sortTasks(weekly, "Weekly")
                const daily = tasks.filter(dailyFilter)
                sortTasks(daily, "Daily")
            }
            filterTasks(result.data);
        };
        fetchData();
    }, []);


    return (
        <div className="tab-space">
            <Title level={3} className="centered task-page">Select items to add to your to-do list</Title>
            <Row className="container task-page" justify="center" gutter={24}>
                <Col span={10}>
                <Title level={2} className="centered">Daily Tasks</Title>
                    {dailyTasks.map((task, index) => {
                        return (
                            <CategoryTask key={index} category={task.category} name={task.name} tags={[]} type="master" />
                        )
                    })}
                </Col>
                <Col span={10}>
                    <Title level={2} className="centered">Weekly Tasks</Title>
                    {weeklyTasks.map((task, index) => {
                        return (
                            <CategoryTask key={index} category={task.category} name={task.name} tags={[]} type="master" />
                        )
                    })}
                </Col>
            </Row>
        </div>
        )
}