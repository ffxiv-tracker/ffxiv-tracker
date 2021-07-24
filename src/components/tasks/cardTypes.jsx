import React, { useEffect } from 'react';
import axios from 'axios';
import { Button, Checkbox, Collapse, Row, Tag } from 'antd';
import TaskCheckbox from './taskCheckbox';
const { Panel } = Collapse;

export function CategoryTask(props) {
    const { category, frequency, currentTasks, tags, type, tasks} = props;
    const [checked, setChecked] = React.useState(false);
    const [selectedTasks, setSelectedTasks] = React.useState(currentTasks);
    const [disabled, setDisabled] = React.useState(false);
    const [status, setStatus] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const checkCompletion = async () => {
        let task = {
            "category": category,
            "frequency": frequency,
            "done": !checked
        };
        const result = await axios.post(
            'https://hdnss8awo4.execute-api.us-west-2.amazonaws.com/user/tasks/current', task)
            .then( response => {
                console.log("results", response.data)
            })
        return result
    };
    const onCategoryChange = () => {
        console.log("stuff", tasks)
        setDisabled(true)
        setTimeout(function(){ setDisabled(false); }, 500);
        checkCompletion();
        setChecked(!checked);
    };
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
    };
    function onCategorySubmit(event) {
        let savedTasks = {
            "category": "",
            frequency,
            "tasks": []
        }
        savedTasks.category = category
        savedTasks.tasks = selectedTasks
        event.stopPropagation();
        saveData(savedTasks);
    }
    function onCategoryTaskChange(checkedValues) {
        setSelectedTasks(checkedValues)
    }
    const categoryCheckbox = <Checkbox checked={checked} onChange={onCategoryChange} disabled={disabled} />
    const categorySubmit = <Button type="primary" onClick={onCategorySubmit}>Add Tasks</Button>

    function updateStatus(childStatus){
        const newStatus = [...status]
        newStatus.push(childStatus)
        if (!newStatus.includes(false)){
            setChecked(true)
        }
    }
// This is the function I was messing with, the child checkbox calls it and passes it's new status up to the parent, with the goal of the parent being able to check if all child checkboxes have been checked, and then update.
    function checkTaskStatus(){
        // tasks.map((task)=>{
        //     const status = []
        //     status.push(task.done)
        //     const completed = !status.includes(false)
        //     setChecked(completed)

        // })
    }

    useEffect(() => {
        tasks.map((task)=>{
            const status = []
            status.push(task.done)
            const completed = !status.includes(false)
            setChecked(completed)

        })
        setLoaded(true);
    }, []);
    return (
        <div className="tab-space">
            {loaded ? <Row justify="space-between" align="middle">
            <Collapse defaultActiveKey={['1']} className={`task-card ${checked ? "checked-collapse" : ""}`}>
                <Panel showArrow={false} header={category} key="1" extra={type==="master" ? categorySubmit : categoryCheckbox}>
                    <Row className="task-description">
                        {type==="master" ? <Checkbox.Group options={tasks} value={selectedTasks} onChange={onCategoryTaskChange} /> :
                        tasks.map((task)=>{
                            console.log("task", task)
                            return <TaskCheckbox category={category} frequency={frequency} name={task.name} status={task.done} checkAll={checked} updateStatus={checkTaskStatus.bind(this)} />
                        })}
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