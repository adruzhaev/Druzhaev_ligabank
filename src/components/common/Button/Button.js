import cn from 'classnames'
import {memo} from 'react'
import './button.scss'

export const Button = memo(function Button({className, title, ...attributes}) {
	return <button className={cn('button', className)} {...attributes}>
		{title}
	</button>
})
