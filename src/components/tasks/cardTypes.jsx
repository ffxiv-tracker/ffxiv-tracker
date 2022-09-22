import React, { useEffect } from 'react';
import { Checkbox } from 'antd';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Center, Flex, Heading} from "@chakra-ui/react"
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
    const categoryCheckbox = <Checkbox className="checkbox-bg" indeterminate={indeterminate} checked={checkAll} onChange={onCheckAllIndeterminateChange}  />
    const categorySubmit = <Box className="box-button" bg="blue.200" borderRadius="lg" onClick={onCategorySubmit}>Add Tasks</Box>

    useEffect(() => {
        if(completeTasks.length === taskNames.length){
            setCheckAll(true)
        } else if(completeTasks.length > 0){
            setIndeterminate(true)
        }
        setLoaded(true);
    }, []);

    useEffect(() => {
        setSelectedTasks(completeTasks)
    }, [completeTasks]);
    return (
        <div className="tab-space">
            {loaded ? <Center>
                <Box className="category-card" justify="space-between" align="middle" width="90%" borderTop="0px" >
                    <Accordion className={`${checked && type!=="master" ? "checked-collapse" : ""}`} defaultIndex={[0]} allowMultiple allowToggle>
                        <AccordionItem borderRadius='lg' borderWidth='1px' marginBottom="1%">
                            <AccordionButton  _expanded={{ color: "white" }} _hover={{ borderRadius: "0.5rem 0.5rem 0 0", bg: "blue.700", color: "white" }}>
                                <Flex width="100%" justify="space-between" align="center" wrap="wrap">
                                    <Heading as="u" size="md">{category}</Heading>
                                    {type==="master" ? categorySubmit : categoryCheckbox}
                                </Flex>
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Box>
                                    {type==="master" ? <Checkbox.Group options={taskNames} value={selectedTasks} onChange={onCategoryTaskChange} /> :
                                    <CheckboxGroup value={checkedList} onChange={onIndeterminateChange} className="checkbox-group" >
                                        <Flex align="center" justify="left" wrap="wrap" width="100%">
                                            {taskNames.map(option =>
                                                <Box key={option} className="checkbox-block">
                                                    <Flex direction="row" align="center">
                                                        {/* <img className="checkbox-image" src={`/images/${option}.png`} onError={(e)=>{e.target.onError = null; e.target.src = "/images/default.png"}} alt="Checkbox Icon" /> */}
                                                        <Checkbox className="checkbox-label" key={option} value={option} onChange={onSingleChange} />
                                                        {option}
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