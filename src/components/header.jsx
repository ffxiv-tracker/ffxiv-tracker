import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

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
        return (
            <div>
                <Layout>
                    <Header className="header">
                        <img className="logo" src={`/images/tomestone-cropped.png`}/>
                        <h2><Link className="header-text" to="/">Home</Link></h2>
                        <h2><Link className="header-text" to="/links">Links</Link></h2>
                        <h2><Link className="header-text" to="/tasks">Tasks</Link></h2>
                        <h2><Link className="header-text" to="/master-tasks">Master Tasks</Link></h2>
                    </Header>
                </Layout>
            </div>

        );
    }
}
