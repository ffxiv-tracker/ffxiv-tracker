import { Card, Checkbox, Row } from 'antd';
import { ExpandingTask } from  './cardTypes';

export default function DailyTasks(props) {
    return (
        // <Card className="task-card">
        //     /* <Row justify="space-between" align="middle">
        //         <h2 className="center-align">
        //             {props.title}
        //         </h2>
        //         <Checkbox />
        //     </Row> */
        //     <ExpandingTask title={props.title}/>
        // </Card>
        <ExpandingTask title={props.title}/>
    )
}