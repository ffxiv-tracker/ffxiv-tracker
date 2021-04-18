import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd';
import axios from 'axios';
import { CategoryTask } from  './cardTypes';
const { Title } = Typography;

export default function TasksPage() {
    const [visible, setVisible] = React.useState(false);
    const [newTask, setNewTask] = React.useState({});
    const [dailyTasks, setDailyTasks] = React.useState([]);
    const [weeklyTasks, setWeeklyTasks] = React.useState([]);
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    function sortTasks(tasks, frequency){
        let sortedDaily = []
        let sortedWeekly = []
        tasks.map((category)=>{
            if (category.frequency === "Weekly"){
                sortedWeekly.push(category)
            }
            if (category.frequency === "Daily"){
                sortedDaily.push(category)
            }
        })
        console.log("daily", sortedDaily)
        console.log("weekly", sortedWeekly)
        setWeeklyTasks(sortedWeekly)
        setDailyTasks(sortedDaily)
    }
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://api.beta.ffxiv.anid.dev/user/tasks',
            );
            sortTasks(result.data);
        };
        fetchData();
    }, []);
    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        form.setFieldsValue({
            task: '',
            description: ''
        });
        setVisible(false);
    };
    const onFinish = values => {
        setNewTask(values);
        form.setFieldsValue({
            task: '',
            description: ''
        });
        setVisible(false);

    };

    return (
        <div className="tab-space">
            <Row className="task-button" justify="center">
                <Button onClick={showModal} size="large">
                    + Add New Task
                </Button>
            </Row>
            <Row className="task-page" justify="center">
                <Col span={10} className="ant-col-fix">
                    <Title level={2} className="centered">Daily Tasks</Title>
                    {dailyTasks.map((task, index) => {
                        return (
                            <CategoryTask key={index} category={task.category} tasks={task.tasks} tags={[]} type="" />
                        )
                    })}
                </Col>
                <Col span={10} className="ant-col-fix">
                    <Title level={2} className="centered">Weekly Tasks</Title>
                    {weeklyTasks.map((task, index) => {
                        return (
                            <CategoryTask key={index} category={task.category} tasks={task.tasks} tags={[]} type="" />
                        )
                    })}
                </Col>
            </Row>
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
                        label="Task"
                        name="task"
                        rules={[{ required: true, message: 'Please input your task!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: false }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}