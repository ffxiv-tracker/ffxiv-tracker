import React, { useEffect } from 'react';
import { Col } from 'antd';
import { CategoryTask } from  './cardTypes';
import DailyData from './dailyData.json';
import { getMasterTasks } from '../../utilities';

export default function DailyTasks() {
    const [data, setData] = React.useState([]);
    useEffect(() => {
        const taskData = getMasterTasks();
        console.log('tasks', taskData)
        setData(taskData)
    }, []);
    return (
        <div className="container task-page">
            <Col span={18} offset={3}>
                {DailyData.map((task, index) => {
                    return (
                        <CategoryTask key={index} category={task.task} name={task.description} tags={[]} />
                    )
                })}
            </Col>
        </div>
    )
}