import moment from 'moment';
import React from 'react'
const { useCallback, useEffect, useRef, useState } = React;

const calculateDuration = eventTime => moment.duration(Math.max(eventTime - (Math.floor(Date.now() / 1000)), 0), 'seconds');

export function Countdown({ eventTime, interval }) {
	const [duration, setDuration] = useState(calculateDuration(eventTime));
	const [complete, setComplete] = useState(false);
	const timerRef = useRef(0);
	const timerCallback = useCallback(() => {
		setDuration(calculateDuration(eventTime));
		if (calculateDuration(eventTime)._milliseconds === 0) {
			setComplete(true)
			clearInterval(timerRef.current);
		}
	}, [eventTime])

	useEffect(() => {
		timerRef.current = setInterval(timerCallback, interval);
		if (calculateDuration(eventTime)._milliseconds === 0) {
			setComplete(true)
			clearInterval(timerRef.current);
		}
		return () => {
			clearInterval(timerRef.current);
		}
	}, [eventTime]);

	return (
		!complete ? <div>
			{duration.days()} Days {duration.hours()} Hours {duration.minutes()} Minutes
		</div> : <div> Sub is back! </div>
	)
}