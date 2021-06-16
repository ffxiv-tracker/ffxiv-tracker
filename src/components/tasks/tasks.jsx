import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd';
import axios from 'axios';
import { CategoryTask } from  './cardTypes';
const { Title } = Typography;

export default function TasksPage() {
    const [visible, setVisible] = React.useState(false);
    const [newTask, setNewTask] = React.useState({});
    const [tasks, setTasks] = React.useState([]);
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://hdnss8awo4.execute-api.us-west-2.amazonaws.com/user/tasks',
            );
            setTasks(result.data);
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
                    {tasks.filter(t => t.frequency === 'Daily').map((task, index) => {
                        return (
                            <CategoryTask key={index} category={task.category} tasks={task.tasks} tags={[]} frequency="Daily" type="" />
                        )
                    })}
                </Col>
                <Col span={10} className="ant-col-fix">
                    <Title level={2} className="centered">Weekly Tasks</Title>
                    {tasks.filter(t => t.frequency === 'Weekly').map((task, index) => {
                        return (
                            <CategoryTask key={index} category={task.category} tasks={task.tasks} tags={[]} frequency="Weekly" type="" />
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