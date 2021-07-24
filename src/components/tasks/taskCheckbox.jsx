import React, { useEffect } from 'react';
import axios from 'axios';
import { Checkbox } from 'antd';

export default function TaskCheckbox(props) {
    const { category, frequency, name, status } = props;
    const [checked, setChecked] = React.useState(status);
    const [disabled, setDisabled] = React.useState(false);
    const [categoryState, setCategoryState] = React.useState(props.checkAll);
    console.log('props', props.checkAll)

    useEffect( () => {
        setCategoryState(props.checkAll);
    }, [props.checkAll]);

    const observantStatus = categoryState ? true : checked

    const toggleChecked = () => {
        setDisabled(true)
        setTimeout(function(){ setDisabled(false); }, 500);
        checkCompletion();
        props.updateStatus(!checked)
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
        <Checkbox checked={observantStatus}  onChange={toggleChecked} disabled={disabled}>{name}</Checkbox>
    )
}