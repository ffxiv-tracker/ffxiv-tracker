import React, { useEffect } from 'react';
import axios from 'axios';
import { Button, Checkbox, Collapse, Row, Tag } from 'antd';
import TaskCheckbox from './taskCheckbox';
import { useSaveNewTasksMutation, useUpdateUserTaskMutation } from '../../services/tracker.ts'
const { Panel } = Collapse;

export function CategoryTask(props) {
    const { category, frequency, currentTasks, tags, type, tasks, taskNames, completeTasks} = props;
    const [checked, setChecked] = React.useState(false);
    const [groupChecked, setGroupChecked] = React.useState(completeTasks);
    const [selectedTasks, setSelectedTasks] = React.useState(currentTasks);
    const [disabled, setDisabled] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);
    const [updateUserTask] = useUpdateUserTaskMutation();
    const [newUserTask] = useSaveNewTasksMutation();
    const checkCompletion = async () => {
        let task = {
            "category": category,
            "frequency": frequency,
            "done": !checked
        };
        updateUserTask(task)
    };
    const checkTaskCompletion = async (name) => {

        let task = {
            "category": category,
            "frequency": frequency,
            "task": name,
            "done": !checked
        };
        console.log("task", task)
        
        updateUserTask(task)
    };
    const onCategoryChange = () => {
        console.log("stuff")
        setDisabled(true)
        setTimeout(function(){ setDisabled(false); }, 500);
        // checkCompletion();
        setChecked(!checked);
    };
    const onCheckChange = (e) => {
        console.log("stuff", e.target)
        console.log("checked", groupChecked)

        setGroupChecked([...groupChecked])
        checkTaskCompletion(e[0])
        // setDisabled(true)
        // setTimeout(function(){ setDisabled(false); }, 500);
        // checkCompletion();
        // setChecked(!checked);
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
        newUserTask(savedTasks)
    }
    function onCategoryTaskChange(checkedValues) {
        setSelectedTasks(checkedValues)
    }
    const categoryCheckbox = <Checkbox checked={checked} onChange={onCategoryChange} disabled={disabled} />
    const categorySubmit = <Button type="primary" onClick={onCategorySubmit}>Add Tasks</Button>
    

    useEffect(() => {
        console.log("tasks", taskNames)
        setLoaded(true);
    }, []);
    return (
        <div className="tab-space">
            {loaded ? <Row justify="space-between" align="middle">
            <Collapse defaultActiveKey={['1']} className={`task-card ${checked ? "checked-collapse" : ""}`}>
                <Panel showArrow={false} header={category} key="1" extra={type==="master" ? categorySubmit : categoryCheckbox}>
                    <Row className="task-description">
                        {type==="master" ? <Checkbox.Group options={tasks} value={selectedTasks} onChange={onCategoryTaskChange} /> :
                            <Checkbox.Group onChange={onCheckChange}>
                                {taskNames.map((task)=>{
                                    console.log('tasky', completeTasks)
                                    if(completeTasks.length !== 0){
                                        return <Checkbox onChange={onCheckChange} defaultChecked={true}>{task}</Checkbox>
                                    } else {
                                        return <Checkbox onChange={onCheckChange}>{task}</Checkbox>
                                    }
                                })}
                            </Checkbox.Group>
                        // tasks.map((task)=>{
                        //     return <TaskCheckbox category={category} frequency={frequency} name={task.name} status={task.done}  />
                        // })
                        }
                    </Row>
                    <Row className="task-description">
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