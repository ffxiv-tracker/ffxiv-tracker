import { Tabs } from 'antd';
import DailyTasks from './daily';
import WeeklyTasks from './weekly'
const { TabPane } = Tabs;

export default function TaskTabs() {
    return (
        <div className="tab-space">
            <Tabs defaultActiveKey="1" type="card" size={"large"} centered>
                <TabPane tab="Daily Tasks" key="1">
                    <DailyTasks />
                </TabPane>
                <TabPane tab="Weekly Tasks" key="2">
                    <WeeklyTasks />
                </TabPane>
            </Tabs>
        </div>
    );
}