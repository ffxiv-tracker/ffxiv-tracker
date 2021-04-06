import { Col } from 'antd';
import { CategoryTask } from  './cardTypes';
import WeeklyData from './weeklyData.json';

export default function WeeklyTasks() {
    return (
        <div className="container task-page">
            <Col span={18} offset={3}>
                {WeeklyData.map((task, index) => {
                    return (
                        <CategoryTask key={index} category={task.task} name={task.description} tags={task.tags} type="personal" />
                    )
                })}
            </Col>
        </div>
    )
}