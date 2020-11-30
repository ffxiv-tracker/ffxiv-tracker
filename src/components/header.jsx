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
                        <Button onClick={this.showDrawer}><MenuOutlined /></Button>
                    </Header>
                </Layout>
                <Drawer
                    title="Basic Drawer"
                    placement={"left"}
                    closable={false}
                    onClose={this.onClose}
                    visible={visible}
                    key={"left"}
                >
                    <p><Link to="/">Home</Link></p>
                    <p><Link to="/links">Links</Link></p>
                    <p><Link to="/tasks">Tasks</Link></p>
                </Drawer>
            </div>

        );
    }
}
