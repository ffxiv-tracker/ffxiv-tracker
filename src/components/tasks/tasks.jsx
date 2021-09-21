import React from 'react';
import { Button, Col, Form, Input, Modal, Row, Select, Spin, Typography } from 'antd';
import { CategoryTask } from  './cardTypes';
import { useGetUserTasksQuery, useSaveNewTasksMutation } from '../../services/tracker.ts'
const { Title } = Typography;
const { Option } = Select;

export default function TasksPage() {
    const [visible, setVisible] = React.useState(false);
    const [newUserTask] = useSaveNewTasksMutation();
    const {data, isLoading} = useGetUserTasksQuery();
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
        let customTasks = data.filter(t => t.frequency === values.frequency).reduce(function (newArr, task) {
            if (task.category === 'Custom') {
                task.tasks.map((subtask)=>{
                    newArr.push(subtask.name);
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
    };

    return (
        isLoading ? <Spin size="large" /> : (
            <div className="tab-space">
                <Row className="task-button" justify="center">
                    <Button onClick={showModal} size="large">
                        + Add New Task
                    </Button>
                </Row>
                <Row className="task-page" justify="center">
                    <Col span={10} className="ant-col-fix">
                        <Title level={2} className="centered">Daily Tasks</Title>
                        {data.filter(t => t.frequency === 'Daily').map((task, index) => {
                            let names = []
                            let done = []
                            task.tasks.map((task)=>{
                                names.push(task.name)
                                if(task.done === true){
                                    done.push(task.name)
                                }
                                return task
                            })
                            return (
                                <CategoryTask key={index} category={task.category} taskNames={names} completeTasks={done} tags={[]} frequency="Daily" type="" />
                            )
                        })}
                    </Col>
                    <Col span={10} className="ant-col-fix">
                        <Title level={2} className="centered">Weekly Tasks</Title>
                        {data.filter(t => t.frequency === 'Weekly').map((task, index) => {
                            let names = []
                            let done = []
                            task.tasks.map((task)=>{
                                names.push(task.name)
                                if(task.done === true){
                                    done.push(task.name)
                                }
                                return task
                            })
                            return (
                                <CategoryTask key={index} category={task.category} tasks={task.tasks} taskNames={names} completeTasks={done} tags={[]} frequency="Weekly" type="" />
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
            </div>
        )
    );
}