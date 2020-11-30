import { Col } from 'antd';
import TaskCard from './taskCard';
import WeeklyData from './weeklyData.json';

export default function WeeklyTasks() {
    return (
        <div className="container link-page">
            <Col span={18} offset={3}>
                {WeeklyData.map((task) => {
                    return (
                        <TaskCard title={task.task} />
                    )
                })}
            </Col>
        </div>
    )
}