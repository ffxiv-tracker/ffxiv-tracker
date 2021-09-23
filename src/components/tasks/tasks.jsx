import React from 'react';
import { Col, Row, Spin, Typography } from 'antd';
import { CategoryTask } from  './cardTypes';
import { useGetUserTasksQuery } from '../../services/tracker.ts'
const { Title } = Typography;


export default function TasksPage() {
    const {data, isLoading} = useGetUserTasksQuery();
    return (
        isLoading ? <Spin size="large" /> : (
            <div className="tab-space">
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
            </div>
        )
    );
}