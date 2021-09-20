import React, {useEffect} from 'react';
import axios from 'axios';
import {Col, Row, Spin, Typography} from 'antd';
import {CategoryTask} from './cardTypes';
import {Category, Frequency, MasterCategory} from "../../services/types";

const {Title} = Typography;

interface UpdatedCategory extends MasterCategory {
    currentTasks: string[];
}

export default function DailyTasks() {
    const [combinedTasks, setCombinedTasks] = React.useState<UpdatedCategory[]>([]);
    const [loading, setLoading] = React.useState(true);

    function combineTasks(userData: Category[], masterData: MasterCategory[]) {
        let currentTasks: { [category: string]: string[] } = {}
        const currentTaskCategories: string[] = []
        let updatedTasks: UpdatedCategory[] = []
        userData.map((task) => {
            let parsedTasks: string[] = []
            currentTaskCategories.push(task.category)
            task.tasks.map((names) => {
                parsedTasks.push(names.name)
            })
            currentTasks[task.category] = parsedTasks
        })
        masterData.map((task) => {
            let updatedCategory: UpdatedCategory = {
                ...task,
                currentTasks: []
            }
            if (currentTaskCategories.includes(task.category)) {
                updatedCategory.currentTasks = currentTasks[task.category]
            }
            updatedTasks.push(updatedCategory)
        })
        setCombinedTasks(updatedTasks)
        setLoading(false)
    }

    useEffect(() => {
        async function getData() {
            const fetchUserData = async () => {
                const userResults = await axios(
                    'https://hdnss8awo4.execute-api.us-west-2.amazonaws.com/user/tasks',
                );
                return userResults.data as Category[];
            };
            const fetchTaskData = async () => {
                const result = await axios(
                    'https://hdnss8awo4.execute-api.us-west-2.amazonaws.com/tasks',
                );
                return result.data as MasterCategory[];
            };
            const user = await fetchUserData();
            const master = await fetchTaskData();
            combineTasks(user, master);

        }

        getData();
    }, []);

    return (
        loading ? <Spin size="large"/> : (
            <div className="tab-space">
                <Title level={3} className="centered task-page">Select items to add to your to-do list</Title>
                <Row className="task-page" justify="center">
                    <Col span={10} className="ant-col-fix">
                        <Title level={2} className="centered">Daily Tasks</Title>
                        {combinedTasks.filter(t => t.frequency === Frequency.DAILY).map((task, index) => {
                            return (
                                <CategoryTask key={index} category={task.category} taskNames={task.tasks}
                                              completeTasks={task.currentTasks} tags={[]} type="master"
                                              frequency={task.frequency}/>
                            )
                        })}
                    </Col>
                    <Col span={10} className="ant-col-fix">
                        <Title level={2} className="centered">Weekly Tasks</Title>
                        {combinedTasks.filter(t => t.frequency === Frequency.WEEKLY).map((task, index) => {
                            return (
                                <CategoryTask key={index} category={task.category} taskNames={task.tasks}
                                              completeTasks={task.currentTasks} tags={[]} type="master"
                                              frequency={task.frequency}/>
                            )
                        })}
                    </Col>
                </Row>
            </div>
        )
    )
}