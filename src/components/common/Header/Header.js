import cn from 'classnames'
import {Icon} from '../Icon/Icon.js'
import {Logo} from '../Logo/Logo.js'
import {memo} from 'react'
import {NavLink} from "react-router-dom";
import './header.scss'
import sprite from '../../../assets/sprite.svg'

const FUNCTIONALITY = [
	{
		title: 'Услуги',
		link: 'services',
	}, 
	{
		title: 'Рассчитать кредит',
		link: 'calculate-credit',
	}, 
	{
		title: 'Конвертер валют',
		link: 'currency-conversion',
	}, 
	{
		title: 'Контакты',
		link: 'contacts',
	}, 
	{
		title: 'Задать вопрос',
		link: 'ask-question',
	},
]

export const Header = memo(function Header({
	className
}) {
	return <header className={cn('header', className)}>
		<div className="header__container">
			<Logo />

			<ul className="option">
				{FUNCTIONALITY.map((item) => {
					return <li title={item.title} key={item.title}>
						<NavLink activeClassName="option__link--active" className="option__link" to={`${item.link}`}>
							{item.title}
						</NavLink>
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