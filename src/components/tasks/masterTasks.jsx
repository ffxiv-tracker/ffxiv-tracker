import React, { useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import { CategoryTask } from  './cardTypes';
import DailyData from './dailyData.json';
import { getMasterTasks } from '../../utilities';

export default function DailyTasks() {
    const [data, setData] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const [dailyTasks, setDailyTasks] = React.useState([]);
    const [weeklyTasks, setWeeklyTasks] = React.useState([]);
    const taskData = getMasterTasks();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://34.219.238.37/tasks',
            );
       
            setData(result.data);
            setLoaded(true)
          };
       
          fetchData();
      }, []);


    
    return (
        <div className="tab-space">
            {loaded ? 
            <Row>
            <Col span={18} offset={3}>
                {data.map((task, index) => {
                    console.log('task', task)
                    return (
                        <CategoryTask key={index} category={task.category} name={task.name} orphan={task.orphan} tags={[]} />
                    )
                })}
            </Col>
            {/* <Col span={18} offset={3}>
                {weeklyTasks.map((task, index) => {
                    return (
                        <TaskCard key={index} title={task.name} description={task.description} tags={task.tags} />
                    )
                })}
            </Col> */}
            </Row>     : null
            }
        </div>
        )
}