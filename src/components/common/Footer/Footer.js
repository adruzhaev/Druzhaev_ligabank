import {Hotline} from '../Hotline/Hotline.js'
import {Icon} from '../Icon/Icon.js'
import {Logo} from '../Logo/Logo.js'
import {memo} from 'react'
import sprite from '../../../assets/sprite.svg'
import './footer.scss'

const FUNCTIONALITY = ['Услуги', 'Рассчитать кредит', 'Контакты', 'Задать вопрос']

export const Footer = memo(function Footer({className}) {
	return <footer className="footer">
		<div className="footer__container">
			<div className="logo-part">
				<Logo />

				<p className="logo-part__address">
					150015, г. Москва, ул. Московская, д. 32
					Генеральная лицензия Банка России №1050
					Ⓒ Лига Банк, 2019
				</p>
			</div>

			<nav>
				<ul className="option-footer">
					{FUNCTIONALITY.map((item) => {
						return <li>
							<a className="option-footer__link" href="/">
								{item}
							</a>
						</li>
					})}
				</ul>
			</nav>

			<Hotline 
				description="Бесплатно для абонентов МТС, Билайн, Мегафон, Теле2"
				href="tel:0904" 
				iconName={`${sprite}#hotline-mobile`}
				iconFill="#1f1e25" 
				iconWidth="10" 
				iconHeight="16"
				number="*0904"
			/>

			<Hotline 
				number="8 800 111 22 33" 
				description="Бесплатный для всех городов России" 
				href="tel:88001112233" 
				iconName={`${sprite}#hotline-call`}
				iconFill="#1f1e25" 
				iconWidth="16" 
				iconHeight="16"
			/>

			<div className="social-icons">
				<a href="/facebook">
					<Icon name={`${sprite}#facebook`} color="#1f1e25" width="9" height="16" />
				</a>

				<a href="/instagram">
					<Icon name={`${sprite}#instagram`} color="#1f1e25" width="16" height="16" />
				</a>

				<a href="/twitter">
					<Icon name={`${sprite}#twitter`} color="#1f1e25" width="16" height="13" />
				</a>
				
				<a href="/youtube">
					<Icon name={`${sprite}#youtube`} color="#1f1e25" width="16" height="13" />
				</a>
			</div>
		</div>
	</footer>
})