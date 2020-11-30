import { Card, Checkbox, Row } from 'antd';

export default function DailyTasks(props) {
    return (
        <Card className="task-card">
            <Row justify="space-between" align="middle">
                <h2 className="center-align">
                    {props.title}
                </h2>
                <Checkbox />
            </Row>
        </Card>
    )
}