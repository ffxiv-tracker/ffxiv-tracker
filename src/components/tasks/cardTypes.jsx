import React from 'react';
import { Card, Checkbox, Col, Collapse, Row } from 'antd';
const { Panel } = Collapse;

const checkEvent = (event)=>{
    console.log('event', event.target.className)
    if (event.target.className !== "ant-checkbox-input") {
        event.stopPropagation()
    }

}


const genExtra = <Checkbox />

export function ExpandingTask(props) {
    const panelHeader = (
        <div className="custom-collapse" onClick={checkEvent}>
          <h2 className="custom-collapse-header">{props.title}</h2>
          <span><Checkbox /></span>
        </div>
      )
    return (
        <Row justify="space-between" align="middle">
            <Collapse defaultActiveKey={['1']} className="task-card">
                <Panel showArrow={false} header={panelHeader} key="1">
                    <p>Expanded Stuff </p>
                </Panel>
            </Collapse>
        </Row>
    )
}

