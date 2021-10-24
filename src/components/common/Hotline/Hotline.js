import cn from 'classnames'
import {Icon} from '../Icon/Icon.js' 
import {memo} from 'react'
import './hotline.scss'

export const Hotline = memo(function Hotline({className, number, description, href, iconName, iconWidth, iconHeight, iconFill}) {
	return <div className={cn('hotline', className)}>
		<Icon name={iconName} color={iconFill} width={iconWidth} height={iconHeight} />

		<div className="hotline__container">
			<a className="hotline__number" href={href}>{number}</a>
			<span className="hotline__description">{description}</span>
		</div>
	</div>
})
