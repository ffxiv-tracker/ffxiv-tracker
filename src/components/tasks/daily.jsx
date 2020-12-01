import { Col } from 'antd';
import TaskCard from './taskCard';
import DailyData from './dailyData.json';

export default function DailyTasks() {
    return (
        <div className="container task-page">
            <Col span={18} offset={3}>
                {DailyData.map((task, index) => {
                    return (
                        <TaskCard key={index} title={task.task} />
                    )
                })}
            </Col>
        </div>
    )
}