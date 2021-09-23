import { Row, Col} from 'antd';

export default function Login() {
    return (
        <div className="container link-page">
            <Row justify="space-around">
                <Col className="splash-box">
                    <a href="https://hdnss8awo4.execute-api.us-west-2.amazonaws.com/login"><img alt="Login" src="/images/discordlogin.png"/></a>
                </Col>
            </Row>
        </div>
    )
}