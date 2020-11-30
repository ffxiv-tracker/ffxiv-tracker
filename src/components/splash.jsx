import { Card, Row, Col} from 'antd';

export default function SplashPage() {
    return (
        <div className="container link-page">
            <Row justify="space-around">
                <Col className="gutter-row" span={12}>
                    <Card>
                        <h2 className="center-align">
                            Log In
                        </h2>
                    </Card>
                </Col>
            </Row>
            <Row justify="space-around">
                <Col className="gutter-row" span={12}>
                    <Card>
                        <h2 className="center-align">
                            Sign Up
                        </h2>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}