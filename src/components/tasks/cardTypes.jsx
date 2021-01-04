import React from 'react';
import { Checkbox, Collapse, Row } from 'antd';
const { Panel } = Collapse;

export function ExpandingTask(props) {
    const [checked, setChecked] = React.useState(false);
    const onChange = () =>{
        setChecked(!checked)
    }
    const checkbox = <Checkbox checked={checked} onChange={onChange} />
    const { description, title} = props;
    return (
        <Row justify="space-between" align="middle">
            {description.length !== 0 ? <Collapse defaultActiveKey={['1']} className={`task-card ${checked ? "checked-collapse" : ""}`}>
                <Panel showArrow={false} header={title} key="1" extra={checkbox}>
                    {description}
                </Panel>      
            </Collapse> : 
            <Collapse className={`task-card ${checked ? "checked-collapse" : ""}`}>
                <Panel disabled={true} showArrow={false} header={title} extra={checkbox} />
            </Collapse>}
        </Row>
    )
}