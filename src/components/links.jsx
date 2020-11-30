import React from 'react';
import { Card, Row, Col} from 'antd';

export default function SplashPage() {
    return (
        <div className="container link-page">
            <Row gutter={16} justify="center">
                <Col className="gutter-row" span={6}>
                    <Card>
                        <h2 className="center-align">
                        <a className="white-text" href="https://docs.google.com/spreadsheets/d/1mJqzs3HsbVCC7O51CSnfjc-Kb72qaRkhNJQIfjIUFPk/edit#gid=0" target="_blank" rel="noreferrer" >Wondrous Tales</a>
                        </h2>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card>
                        <h2 className="center-align">
                        <a className="white-text" href="https://docs.google.com/spreadsheets/d/1SHwqauem0KAw7pW0_qvajU9DF_HKsSUh9Mbt-dYTgJY/edit#gid=1147333649" target="_blank" rel="noreferrer" >Mounts/Minions</a>
                        </h2>
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}  justify="center">
                <Col className="gutter-row" span={6}>
                    <Card>
                        <h2 className="center-align">
                        <a className="white-text" href="https://www.digitaltrends.com/gaming/ffxiv-ocean-fishing-guide-mount-minion-spectral-current-tips/" target="_blank" rel="noreferrer" >Ocean Fishing</a>
                        </h2>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Card>
                        <h2 className="center-align">
                        <a className="white-text" href="https://www.ffxivhuntpaths.com/hw/" target="_blank" rel="noreferrer">Hunt Paths</a>
                        </h2>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}