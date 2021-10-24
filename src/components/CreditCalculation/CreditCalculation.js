import {memo} from 'react'
import {Button} from '../common/Button/Button'
import blackCard from '../../assets/blackCard.jpg'
import whiteCard from '../../assets/whiteCard.jpg'
import './creditCalculation.scss'

export const CreditCalculation = memo(function CreditCalculation({className}) {
	return <div className="credit">
		<section className="calculation">
			<h2 className="calculation__title">Лига Банк</h2>
			<span className="calculation__description">Кредиты на любой случай</span>

			<a href="/calculate-credit">
				<Button className="calculation__button" title="Рассчитать кредит" />
			</a>
		</section>

		<section className="cards">
			<img className="cards__black" width="289px" height="182px" src={blackCard} alt="Credit card black" />
			<img className="cards__white" width="289px" height="182px" src={whiteCard} alt="Credit card black" />
		</section>
	</div>
})