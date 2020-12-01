import React from 'react';
import { Button, Form, Input, Modal, Row, Tabs } from 'antd';
import DailyTasks from './daily';
import WeeklyTasks from './weekly';
const { TabPane } = Tabs;

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
            <Tabs defaultActiveKey="1" type="card" size={"large"} centered>
                <TabPane tab="Daily Tasks" key="1">
                    <Row className="task-button" justify="center">
                        <Button onClick={showModal} size="large">
                            + Add New Task
                        </Button>
                    </Row>
                    <DailyTasks />
                </TabPane>
                <TabPane tab="Weekly Tasks" key="2">
                    <Row className="task-button" justify="center">
                        <Button onClick={showModal} size="large">
                            + Add New Task
                        </Button>
                    </Row>
                    <WeeklyTasks />
                </TabPane>
            </Tabs>
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