import React, { useEffect } from 'react';
import { Alert, Button, Checkbox, Col, Collapse, Image, Row, Spin, Tag } from 'antd';
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
    const [masterAlertVisible, setMasterAlertVisible] = React.useState(false);
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
        newUserTask(savedTasks);
        showAlert();
    }
    function onCategoryTaskChange(checkedValues) {
        setSelectedTasks(checkedValues)
    }

    const showAlert= () => {
        setMasterAlertVisible(true);
        setTimeout(() => {setMasterAlertVisible(false);}, 3000);
    };
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
            {masterAlertVisible ? <Alert message="Master tasks successfully updated" type="success" showIcon /> : null}
            {loaded ? <Row justify="space-between" align="middle">
            <Collapse defaultActiveKey={['1']} className={`task-card ${checked && type!=="master" ? "checked-collapse" : ""}`}>
                <Panel className="collapse-card-title" showArrow={false} header={category} key="1" extra={type==="master" ? categorySubmit : categoryCheckbox}>
                    <Row>
                        {type==="master" ? <Checkbox.Group options={taskNames} value={selectedTasks} onChange={onCategoryTaskChange} /> :
                            <CheckboxGroup value={checkedList} onChange={onIndeterminateChange} className="checkbox-group" >
                                {taskNames.map(option =>
                                    <Col span={4} className="checkbox-block">
                                            {/* <img className="checkbox-image" src={`/images/${option}.png` ? `/images/${option}.png` : "https://xivapi.com/i/071000/071241.png"} /> */}
                                            <img className="checkbox-image"  src={`/images/${option}.png`} onError={(e)=>{e.target.onError = null; e.target.src = "/images/default.png"}}/>
                                            <Checkbox className="checkbox-label" key={option} value={option} onChange={onSingleChange}>{option}</Checkbox>
                                    </Col>
                                )}
                            </CheckboxGroup>
                        }
                    </Row>
                    {/* Commented out but saved in case we decide to introduce tagging */}
                    {/* <Row className="tag-space">
                        {tags.map((tagValue)=>{
                            return (
                                <Tag>{tagValue}</Tag>
                            )
                        })}
                    </Row> */}
                </Panel>
            </Collapse>
        </Row> : <Spin size="large" />
            }
        </div>
    )
}