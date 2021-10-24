import cn from 'classnames'
import {Icon} from '../Icon/Icon.js'
import {memo} from 'react'
import sprite from '../../../assets/sprite.svg'
import './logo.scss'

export const Logo = memo(function Logo({className}) {
	return <a className={cn('logo', className)} href="/">
		<Icon name={`${sprite}#logo`} color="none" width="30" height="27" />
		<Icon name={`${sprite}#logo-text`} color="none" width="112" height="16" />
	</a>
})