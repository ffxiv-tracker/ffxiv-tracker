import { Row, Col} from 'antd';
import {apiBaseUrl} from "../services/tracker";

export default function Login() {
    return (
        <div className="container link-page">
            <Row justify="space-around">
                <Col className="splash-box">
                    <a href={`${apiBaseUrl}login`}><img alt="Login" src="/images/discordlogin.png"/></a>
                </Col>
            </Row>
        </div>
    )
}