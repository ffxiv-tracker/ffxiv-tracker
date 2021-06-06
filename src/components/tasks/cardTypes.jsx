import React, { useEffect } from 'react';
import { Button, Checkbox, Collapse, Row, Tag } from 'antd';
const { Panel } = Collapse;

export function CategoryTask(props) {
    const [checked, setChecked] = React.useState(false);
    const [selectedTasks, setSelectedTasks] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const { category, name, tags, type, tasks} = props;
    const onCategoryChange = () =>{
        setChecked(!checked)
    }
    function addData() {
        if (type == "master"){
            if (category === "Daily Hunts") {
                return (
                    <Button className="margin-auto" type="primary" target="noreferrer noopener" href={"https://www.ffxivhuntpaths.com"}>
                        FFXIV Hunt Paths
                    </Button>
                )
            } else return null;
        }
    }
    function onSubmit(event) {
        event.stopPropagation();
        console.log("Submit Tasks", selectedTasks)
    }
    function onCategorySubmit(event) {
        const tasks = [category]
        setSelectedTasks(tasks)
        event.stopPropagation();
        console.log("Submit Tasks", selectedTasks)
    }
    function onTaskChange(checkedValues) {
        setSelectedTasks(checkedValues)
        console.log('checked = ', checkedValues);
    }
    const categoryCheckbox = <Checkbox checked={checked} onChange={onCategoryChange} />
    const categorySubmit = <Button type="primary" onClick={onCategorySubmit}>Add Tasks</Button>
    const taskSubmit = <Button type="primary" onClick={onSubmit}>Add Tasks</Button>

    useEffect(() => {
        setLoaded(true);
    }, []);
    return (
        <div className="tab-space">
            {loaded ? <Row justify="space-between" align="middle">
            <Collapse defaultActiveKey={['1']} className={`task-card ${checked ? "checked-collapse" : ""}`}>
                <Panel showArrow={false} header={category} key="1" extra={type==="master" ? taskSubmit : categoryCheckbox}>
                    <Row className="task-description">
                        <Checkbox.Group options={tasks} onChange={onTaskChange} />
                    </Row>
                    <Row className="task-description">
                        {addData()}
                    </Row>
                    <Row className="tag-space">
                        {tags.map((tagValue)=>{
                            return (
                                <Tag>{tagValue}</Tag>
                            )
                        })}
                    </Row>
                </Panel>
            </Collapse>
        </Row> : null
            }
        </div>
    )
}