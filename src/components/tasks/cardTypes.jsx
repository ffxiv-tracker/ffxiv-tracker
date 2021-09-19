import React, { useEffect } from 'react';
import { Button, Checkbox, Collapse, Row, Spin, Tag } from 'antd';
import { useSaveNewTasksMutation, useUpdateUserTaskMutation } from '../../services/tracker.ts'
const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;

export function CategoryTask(props) {
    const { category, frequency, tags, type, taskNames, completeTasks} = props;
    const [checked, setChecked] = React.useState(completeTasks.length === taskNames.length);
    const [selectedTasks, setSelectedTasks] = React.useState(completeTasks);
    const [loaded, setLoaded] = React.useState(false);
    const [checkedList, setCheckedList] = React.useState(completeTasks);
    const [indeterminate, setIndeterminate] = React.useState(false);
    const [checkAll, setCheckAll] = React.useState(false);
    const [updateUserTask] = useUpdateUserTaskMutation();
    const [newUserTask] = useSaveNewTasksMutation();

// Indeterminate Functions
    const onIndeterminateChange = async (checkedList) => {
        setCheckedList(checkedList)
        setIndeterminate(!!checkedList.length && checkedList.length < taskNames.length)
        setCheckAll(checkedList.length === taskNames.length)
        if (checkedList.length === taskNames.length){
            setChecked(true)
        } else {
            setChecked(false)
        }
    };
    const onSingleChange = async (event) => {
        let task = {
            "category": category,
            "frequency": frequency,
            "task": event.target.value,
            "done": event.target.checked
        };
        updateUserTask(task)

    };
    const onCheckAllIndeterminateChange = async (e) => {
        setCheckedList(e.target.checked ? taskNames : [])
        setIndeterminate(false)
        setCheckAll(e.target.checked)
        categoryCompletion(e.target.checked)
        setChecked(e.target.checked)
    };

// Update single user task
    const categoryCompletion = async (checked) => {
        let task = {
            "category": category,
            "frequency": frequency,
            "done": checked
        };
        updateUserTask(task)
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
    const categoryCheckbox = <Checkbox indeterminate={indeterminate} checked={checkAll} onChange={onCheckAllIndeterminateChange}  />
    const categorySubmit = <Button type="primary" onClick={onCategorySubmit}>Add Tasks</Button>

    useEffect(() => {
        if(completeTasks.length === taskNames.length){
            setCheckAll(true)
        } else if(completeTasks.length > 0){
            setIndeterminate(true)
        }
        setLoaded(true);
    }, []);
    return (
        <div className="tab-space">
            {loaded ? <Row justify="space-between" align="middle">
            <Collapse defaultActiveKey={['1']} className={`task-card ${checked ? "checked-collapse" : ""}`}>
                <Panel showArrow={false} header={category} key="1" extra={type==="master" ? categorySubmit : categoryCheckbox}>
                    <Row className="task-description">
                        {type==="master" ? <Checkbox.Group options={taskNames} value={selectedTasks} onChange={onCategoryTaskChange} /> :
                            <CheckboxGroup value={checkedList} onChange={onIndeterminateChange} >
                                {taskNames.map(option =>
                                    <Checkbox key={option} value={option} onChange={onSingleChange}>{option}</Checkbox>
                                )}
                            </CheckboxGroup>
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
        </Row> : <Spin size="large" />
            }
        </div>
    )
}