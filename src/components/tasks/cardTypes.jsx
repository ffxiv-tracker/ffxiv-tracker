import React, { useEffect } from 'react';
import { Checkbox, Collapse, Row, Tag } from 'antd';
const { Panel } = Collapse;

export function ExpandingTask(props) {
    const [checked, setChecked] = React.useState(false);
    const onChange = () =>{
        setChecked(!checked)
    }
    const checkbox = <Checkbox checked={checked} onChange={onChange} />
    const { description, title, tags} = props;
    return (
        <Row justify="space-between" align="middle">
            {description.length !== 0 ? <Collapse defaultActiveKey={['1']} className={`task-card ${checked ? "checked-collapse" : ""}`}>
                <Panel showArrow={false} header={title} key="1" extra={checkbox}>
                    <Row className="task-description">{description}</Row>
                    <Row className="tag-space">
                        {tags.map((tagValue)=>{
                            return (
                                <Tag>{tagValue}</Tag>
                            )
                        })}
                    </Row>
                </Panel>      
            </Collapse> : 
            <Collapse className={`task-card ${checked ? "checked-collapse" : ""}`}>
                <Panel disabled={true} showArrow={false} header={title} extra={checkbox} />
            </Collapse>}
        </Row>
    )
}

export function CategoryTask(props) {
    const [checked, setChecked] = React.useState(false);
    const onChange = () =>{
        setChecked(!checked)
    }
    const checkbox = <Checkbox checked={checked} onChange={onChange} />
    const { category, name, frequency, orphan, tags } = props;
    let categoryName = ""
    useEffect(() => {
        const setCategoryName=()=>{
            console.log("orphan", orphan)
            if(orphan === true){
                categoryName = name
            } else {
                categoryName = category
            }
            console.log("name", categoryName)
        }
        
        setCategoryName();
      }, []);
    
    return (
        <Row justify="space-between" align="middle">
            {name.length !== 0 ? <Collapse defaultActiveKey={['1']} className={`task-card ${checked ? "checked-collapse" : ""}`}>
                <Panel showArrow={false} header={categoryName} key="1" extra={checkbox}>
                    <Row className="task-description">{name}</Row>
                    <Row className="tag-space">
                        {tags.map((tagValue)=>{
                            return (
                                <Tag>{tagValue}</Tag>
                            )
                        })}
                    </Row>
                </Panel>      
            </Collapse> : 
            <Collapse className={`task-card ${checked ? "checked-collapse" : ""}`}>
                <Panel disabled={true} showArrow={false} header={categoryName} extra={checkbox} />
            </Collapse>}
        </Row>
    )
}