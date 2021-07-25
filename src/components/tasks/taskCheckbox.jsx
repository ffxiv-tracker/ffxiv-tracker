import React, { useEffect } from 'react';
import { Checkbox } from 'antd';
import { useUpdateUserTaskMutation } from '../../services/tracker.ts'

export default function TaskCheckbox(props) {
    const { category, frequency, name, status } = props;
    const [checked, setChecked] = React.useState(status);
    const [disabled, setDisabled] = React.useState(false);
    const [updateUserTask] = useUpdateUserTaskMutation();
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
        updateUserTask(task)
    };
    return (
        <Checkbox checked={checked}  onChange={toggleChecked} disabled={disabled}>{name}</Checkbox>
    )
}