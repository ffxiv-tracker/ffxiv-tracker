import { Col } from 'antd';
import TaskCard from './taskCard';
import DailyData from './dailyData.json';

export default function DailyTasks() {
    return (
        <div className="container link-page">
            <Col span={18} offset={3}>
                {DailyData.map((task) => {
                    return (
                        <TaskCard title={task.task} />
                    )
                })}
            </Col>
        </div>
    )
}