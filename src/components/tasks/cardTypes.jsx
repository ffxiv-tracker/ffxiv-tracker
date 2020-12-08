import React from 'react';
import { Checkbox, Collapse, Row } from 'antd';
const { Panel } = Collapse;

export function ExpandingTask(props) {
    const [checked, setChecked] = React.useState(false);
    const onChange = () =>{
        setChecked(!checked)
    }
    const checkbox = <Checkbox checked={checked} onChange={onChange} />
    return (
        <Row justify="space-between" align="middle">
            <Collapse defaultActiveKey={['1']} className={`task-card ${checked ? "checked-collapse" : ""}`}>
                <Panel showArrow={false} header={props.title} key="1" extra={checkbox}>
                    <p>Expanded Stuff </p>
                </Panel>
            </Collapse>
        </Row>
    )
}