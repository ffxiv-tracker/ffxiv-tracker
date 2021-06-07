import React, { useEffect } from 'react';
import axios from 'axios';
import { Button, Checkbox, Collapse, Row, Tag } from 'antd';
const { Panel } = Collapse;

export function CategoryTask(props) {
    const { category, frequency, currentTasks, tags, type, tasks} = props;
    const [checked, setChecked] = React.useState(false);
    // const [checkboxTasks, setCheckboxTasks] = React.useState(currentTasks);
    const [selectedTasks, setSelectedTasks] = React.useState(currentTasks);
    const [loaded, setLoaded] = React.useState(false);
    const onCategoryChange = () =>{
        setChecked(!checked)
    }
    function addData() {
        if (type !== "master"){
            if (category === "Daily Hunts") {
                return (
                    <Button className="margin-auto" type="primary" target="noreferrer noopener" href={"https://www.ffxivhuntpaths.com"}>
                        FFXIV Hunt Paths
                    </Button>
                )
            } else return null;
        }
    }
    const saveData = async (submittedTasks) => {
        const result = await axios.post(
            'https://hdnss8awo4.execute-api.us-west-2.amazonaws.com/user/tasks', submittedTasks);
        console.log("results", result)
        // console.log("results", submittedTasks)
    };
    function onSubmit(event) {
        event.stopPropagation();
        console.log("Submit Tasks", selectedTasks)
    }
    function onCategorySubmit(event) {
        console.log('props', props)
        let savedTasks = {
            "category": "",
            frequency,
            "tasks": []
        }
        savedTasks.category = category
        savedTasks.tasks = selectedTasks
        event.stopPropagation();
        saveData(savedTasks);
        console.log("Submit Tasks", savedTasks)
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
                <Panel showArrow={false} header={category} key="1" extra={type==="master" ? categorySubmit : categoryCheckbox}>
                    <Row className="task-description">
                        <Checkbox.Group options={tasks} value={selectedTasks} onChange={onTaskChange} />
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