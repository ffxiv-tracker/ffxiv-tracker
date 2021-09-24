import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Col, Layout, Row } from 'antd';
import jwt_decode from "jwt-decode";

const { Header } = Layout;

export default function NavHeader () {
    const jwt = localStorage.getItem("jwt")
    let decodedValue
    if(jwt){
        decodedValue = jwt_decode(jwt);
    }
    return (
        <div>
            <Layout>
                <Header className="header">
                    <Row className="header-row">
                        <Col className="logo-block" span={8}><img className="logo" src={`/images/tomestone-cropped.png`} alt="Logo" /></Col>
                                <Col className="menu-text" span={2}><h2><Link className="header-text" to="/">Home</Link></h2></Col>
                                <Col className="menu-text" span={2}><h2><Link className="header-text" to="/links">Links</Link></h2></Col>
                                <Col className="menu-text" span={2}><h2><Link className="header-text" to="/tasks">Tasks</Link></h2></Col>
                                <Col className="menu-text" span={2}><h2><Link className="header-text" to="/master-tasks">Master Tasks</Link></h2></Col>
                        {jwt ? <Col className="avatar-block" span={8}>
                            <h3 className ="avatar-username">{decodedValue.username}</h3>
                            <Avatar size={48} src={`https://cdn.discordapp.com/avatars/${decodedValue.id}/${decodedValue.avatar}.png`} />
                        </Col> : null}
                    </Row>
                </Header>
            </Layout>
        </div>

    );
}
