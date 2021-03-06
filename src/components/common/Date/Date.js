import {memo, useCallback, useRef, useState} from "react";
import dayjs from 'dayjs'
import DayPicker from 'react-day-picker';
import {Icon} from '../Icon/Icon'
import sprite from '../../../assets/sprite.svg'
import {useClickOutsideEffect} from '../../../helpers/use-click-outside-effect'
import 'react-day-picker/lib/style.css';
import './date.scss'

export const Date = memo(function Date({register, ...attributes}) {
	const [isDayPickerShown, setIsDayPickerShown] = useState(false)
	const dateNow = dayjs().format('DD.MM.YYYY')
	const rootReference = useRef(null)
	const [selectedDay, setSelectedDay] = useState(dateNow)

	const hide = useCallback(() => {
    setIsDayPickerShown(false)
  }, [setIsDayPickerShown])

	useClickOutsideEffect({
    callback     : hide,
    nodeRef      : rootReference,
    toggleNodeRef: rootReference,
  })

	const onDayClickHandler = useCallback((day, {selected}) => {
    setSelectedDay({
      selectedDay: selected ? undefined : day,
    })
		hide()
  }, [hide])

	return <div className="container" ref={rootReference}>
		<input 
			className="date-input" 
			onClick={() => setIsDayPickerShown(true)}
			placeholder={dateNow} 
			value={dayjs(selectedDay.selectedDay).format('YYYY-MM-DD')} 
			{...register} 
			{...attributes} 
		/>
		<Icon className="calendar" name={`${sprite}#calendar`} color="none" width="41" height="44" />	

		{isDayPickerShown && <DayPicker 
			className="day-picker" 
			onDayClick={onDayClickHandler}
			selectedDays={selectedDay}   
		/>}
	</div>
})
