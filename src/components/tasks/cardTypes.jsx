import React, { useEffect } from 'react';
import { Checkbox } from 'antd';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Button, Center, Flex, Heading, Spinner, useCheckboxGroup } from "@chakra-ui/react"
import { useSaveNewTasksMutation, useUpdateUserTaskMutation } from '../../services/tracker.ts'
const CheckboxGroup = Checkbox.Group;

export function CategoryTask(props) {
    const { category, frequency, showAlert, type, taskNames, completeTasks} = props;
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
        newUserTask(savedTasks);
        showAlert("add");
    }
    function onCategoryTaskChange(checkedValues) {
        setSelectedTasks(checkedValues)
    }
    // const categoryCheckbox = <Checkbox isIndeterminate={indeterminate} isChecked={checkAll} onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])} />
    const categoryCheckbox = <Checkbox indeterminate={indeterminate} checked={checkAll} onChange={onCheckAllIndeterminateChange}  />
    const categorySubmit = <Box onClick={onCategorySubmit}>Add Tasks</Box>

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
            {loaded ? <Center>
                <Box className="category-card" justify="space-between" align="middle" width="90%" borderWidth="1px">
                    <Accordion className={`${checked && type!=="master" ? "checked-collapse" : ""}`} defaultIndex={[0]} allowMultiple allowToggle>
                        <AccordionItem>
                            <AccordionButton bg="blue.700">
                                <Flex width="100%" justify="space-between" align="center" wrap="wrap">
                                    <Heading size="sm">{category}</Heading>
                                    {type==="master" ? categorySubmit : categoryCheckbox}
                                </Flex>
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Box>
                                    {type==="master" ? <Checkbox.Group options={taskNames} value={selectedTasks} onChange={onCategoryTaskChange} /> :
                                    <CheckboxGroup value={checkedList} onChange={onIndeterminateChange} className="checkbox-group" >
                                        <Flex align="center" justify="center" wrap="wrap" width="100%">
                                            {taskNames.map(option =>
                                                <Box key={option}className="checkbox-block">
                                                    <Flex direction="column" align="center">
                                                        <img className="checkbox-image" src={`/images/${option}.png`} onError={(e)=>{e.target.onError = null; e.target.src = "/images/default.png"}} alt="Checkbox Icon" />
                                                        {option}
                                                        <Checkbox className="checkbox-label" key={option} value={option} onChange={onSingleChange} />
                                                    </Flex>
                                                </Box>
                                                )}
                                        </Flex>
                                    </CheckboxGroup>
                                    }
                                </Box>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
            </Center> : null
            }
        </div>
    )
}