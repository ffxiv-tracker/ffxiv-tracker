import React from 'react';
import { Alert, Button, Col, Form, Input, Modal, Row, Select, Spin, Typography } from 'antd';
import { Box, Flex, Heading, Spacer, Spinner } from "@chakra-ui/react"
import { CategoryTask } from  './cardTypes';
import { useGetMasterTasksQuery, useSaveNewTasksMutation } from '../../services/tracker.ts'
const { Option } = Select;

export default function DailyTasks() {
    const {data, isLoading} = useGetMasterTasksQuery();
    const [visible, setVisible] = React.useState(false);
    const [customAlertVisible, setCustomAlertVisible] = React.useState(false);
    const [newUserTask] = useSaveNewTasksMutation();
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const showModal = () => {
        setVisible(true);
    };

    const showAlert= () => {
        setCustomAlertVisible(true);
        setTimeout(() => {setCustomAlertVisible(false);}, 3000);
    };

    const handleCancel = () => {
        form.setFieldsValue({
            task: '',
            description: ''
        });
        setVisible(false);
    };
    const onFinish = values => {
        let customTasks = data.filter(t => t.frequency === values.frequency).reduce(function (newArr, task) {
            if (task.category === 'Custom') {
                task.tasks.map((subtask)=>{
                    newArr.push(subtask.name);
                    return null
                })
                return newArr
            }
            return newArr;
        }, []);
        customTasks.push(values.task)
        const newTask = {
            "category": "Custom",
            "frequency": values.frequency,
            "tasks": customTasks
        }
        newUserTask(newTask)
        form.setFieldsValue({
            task: '',
            category: ''
        });
        setVisible(false);
        showAlert();
    };

    return (
        isLoading ? <Spinner size="xl" /> : (
        <Box>
            <Box className="task-page" justify="center">
                <Heading>Select items to add to your to-do list</Heading>
                <Button className="task-button" onClick={showModal} size="large">
                    + Add New Task
                </Button>
            </Box>
            {customAlertVisible ? <Alert message="Custom task successfully added" type="success" showIcon /> : null
            }
            <Box className="" justify="center">
                <Flex>
                    <Spacer />
                    <Box span={10} className="ant-col-fix">
                        <Heading className="centered">Daily Tasks</Heading>
                        {data.filter(t => t.frequency === 'Daily').map((task, index) => {
                                let names = []
                                let selected = []
                                task.tasks.map((task)=>{
                                    names.push(task.name)
                                    if(task.selected === true){
                                        selected.push(task.name)
                                    }
                                    return task
                                })
                                return (
                                    <CategoryTask key={index} category={task.category} taskNames={names} completeTasks={selected} tags={[]} frequency="Daily" type="master" />
                                )
                            })}
                    </Box>
                    <Spacer />
                    <Box span={10} className="ant-col-fix">
                        <Heading className="centered">Weekly Tasks</Heading>
                        {data.filter(t => t.frequency === 'Weekly').map((task, index) => {
                                let names = []
                                let selected = []
                                task.tasks.map((task)=>{
                                    names.push(task.name)
                                    if(task.selected === true){
                                        selected.push(task.name)
                                    }
                                    return task
                                })
                                return (
                                    <CategoryTask key={index} category={task.category} tasks={task.tasks} taskNames={names} completeTasks={selected} tags={[]} frequency="Weekly" type="master" />
                                )
                            })}
                    </Box>
                    <Spacer />
                </Flex>
            </Box>
            <Modal
                    title="Add a New Task"
                    visible={visible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        {...layout}
                        name="tasks"
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Task Name"
                            name="task"
                            rules={[{ required: true, message: 'Please input your task!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Task Frequency"
                            name="frequency"
                            rules={[{ required: true, message: 'Please select your task frequency!' }]}
                        >
                            <Select placeholder="Select your task frequency">
                                <Option value="Daily">Daily</Option>
                                <Option value="Weekly">Weekly</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
        </Box>
        )
    )
}