import { Button, Row, Col} from 'antd';

export default function SplashPage() {
    return (
        <div className="container link-page">
            <Row justify="space-around">
                <Col className="gutter-row" span={12}>
                    <Button href="https://hdnss8awo4.execute-api.us-west-2.amazonaws.com/login">Log In</Button>
                </Col>
            </Row>
        </div>
    )
}