import { ExpandingTask } from  './cardTypes';

export default function TaskCard(props) {
    return (
        <ExpandingTask title={props.title} description={props.description} tags={props.tags}/>
    )
}