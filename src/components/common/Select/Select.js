import cn from 'classnames'
import {Icon} from '../Icon/Icon'
import {memo} from "react";
import sprite from '../../../assets/sprite.svg'
import './select.scss'

const OPTIONS = ['RUB', 'USD', 'EUR', 'GBP', 'CNY']

export const Select = memo(function Select({className, register, ...attributes}) {
	return <div className="container">
		<Icon className="arrow" name={`${sprite}#select-arrow`} color="none" width="18" height="11" />	
		<select className={cn('select', className)} name="select" {...register} {...attributes}>
			{OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
		</select>
	</div>
})