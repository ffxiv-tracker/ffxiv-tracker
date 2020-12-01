import { Col } from 'antd';
import TaskCard from './taskCard';
import WeeklyData from './weeklyData.json';

export default function WeeklyTasks() {
    return (
        <div className="container task-page">
            <Col span={18} offset={3}>
                {WeeklyData.map((task, index) => {
                    return (
                        <TaskCard key={index} title={task.task} />
                    )
                })}
            </Col>
        </div>
    )
}