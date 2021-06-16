import React, { useEffect } from 'react';
import axios from 'axios';
import { Checkbox } from 'antd';

export default function TaskCheckbox(props) {
    const { category, frequency, name, status } = props;
    const [checked, setChecked] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const toggleChecked = () => {
        setDisabled(true)
        setTimeout(function(){ setDisabled(false); }, 500);
        checkCompletion();
        setChecked(!checked);
    };
    const checkCompletion = async () => {
        let task = {
            "category": category,
            "frequency": frequency,
            "task": name,
            "done": !checked
        };
        const result = await axios.post(
            'https://hdnss8awo4.execute-api.us-west-2.amazonaws.com/user/tasks/current', task)
            .then( response => {
                console.log("results", response.data)
            })
        return result
    };

    return (
        <Checkbox checked={checked} defaultChecked={status} onChange={toggleChecked} disabled={disabled}>{name}</Checkbox>
    )
}