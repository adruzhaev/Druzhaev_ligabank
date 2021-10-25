import cn from 'classnames'
import {Icon} from '../Icon/Icon.js'
import {Logo} from '../Logo/Logo.js'
import {memo} from 'react'
import './header.scss'
import sprite from '../../../assets/sprite.svg'

const FUNCTIONALITY = ['Услуги', 'Рассчитать кредит', 'Конвертер валют', 'Контакты', 'Задать вопрос']

export const Header = memo(function Header({
	className
}) {
	return <header className={cn('header', className)}>
		<div className="header__container">
			<Logo />

			<ul className="option">
				{FUNCTIONALITY.map((item) => {
					return <li key={item}>
						<a className="option__link" href="/">
							{item}
						</a>
					</li>
				})}
			</ul>

			<a className="header__login login" href="/login">
				<Icon name={`${sprite}#icon-password`} color="#1f1e25" width="20" height="22" />
				<span className="login__text">Войти в Интернет-банк</span>
			</a>
		</div>
	</header>
})