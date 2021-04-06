import React from 'react';
import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd';
import DailyTasks from './daily';
import WeeklyTasks from './weekly';
const { Title } = Typography;

export default function TasksPage() {
    const [visible, setVisible] = React.useState(false);
    const [newTask, setNewTask] = React.useState({});
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
            <Row>
                <Col span={12}>
                    <Title level={2} className="centered">Daily Tasks</Title>
                    <DailyTasks />
                </Col>
                <Col span={12}>
                    <Title level={2} className="centered">Weekly Tasks</Title>
                    <WeeklyTasks />
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