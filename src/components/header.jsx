import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;

export default class NavDrawer extends React.Component {
    state = { visible: false, placement: 'left' };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        const { visible } = this.state;
        return (
            <div>
                <Layout>
                    <Header className="header">
                        <h2><Link to="/">Home</Link></h2>
                        <h2><Link to="/links">Links</Link></h2>
                        <h2><Link to="/tasks">Tasks</Link></h2>
                        <h2><Link to="/master-tasks">Master Tasks</Link></h2>
                    </Header>
                </Layout>
            </div>

        );
    }
}
