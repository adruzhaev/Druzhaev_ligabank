import {memo, useEffect, useMemo, useState} from 'react'
import axios from 'axios'
import {Button} from '../common/Button/Button'
import {Date} from '../common/Date/Date'
import dayjs from 'dayjs'
import {Input} from '../common/Input/Input'
import {Select} from '../common/Select/Select'
import {useForm} from 'react-hook-form'
import './converterCounter.scss'

export const ConverterCounter = memo(function ConverterCounter({className}) {
	const [currency, setCurrency] = useState(0)
	const {register, watch, formState} = useForm();
	const amountFromValue = watch("amount-from")
	const amountToValue = watch("amount-to")
	const currencyTypeFrom = watch("currency-type-from")
	const currencyTypeTo = watch("currency-type-to")
	const dateOfСonversion = watch("date-of-conversion")
	const dateNow = dayjs().format('YYYY-MM-DD')
	const searchType = dateOfСonversion === dateNow ? 'latest' : 'historical'

	console.log(dateOfСonversion);

	const amountFromValueChanging = useMemo(() => {
		if (formState.name === 'amount-from' && formState.isDirty) {
			return amountFromValue
		}

		return amountToValue * currency
	}, [amountToValue, amountFromValue, formState.name, formState.isDirty, currency])

	const amountToValueChanging = useMemo(() => {
		if (formState.name === 'amount-to' && formState.isDirty) {
			return amountToValue
		}

		return amountFromValue * currency
	}, [amountToValue, amountFromValue, formState.name, formState.isDirty, currency])

	useEffect(() => {
		const getCurrencyData = async () => {
			try {	
				if (!currencyTypeFrom) {
					return 
				}
				const response = await axios.get(`https://freecurrencyapi.net/api/v2/${searchType}?apikey=1deb9940-34ce-11ec-bb15-01fdbe3a3361&base_currency=${currencyTypeFrom}&date_from=${dateOfСonversion}&date_to=${dateOfСonversion}`);
				return response.data
			} catch (error) {
				console.error(error);
			}
		}

		getCurrencyData().then(data => {
			if (data && searchType === 'historical') {
				console.log('historical data: ', data);
				setCurrency(data.data[`${dateOfСonversion}`][`${currencyTypeTo}`])
			}
 			
			if (data && searchType === 'latest') {
				console.log('latest data: ', data);
				setCurrency(data.data[`${currencyTypeTo}`])
			}
		})
	}, [currencyTypeFrom, currencyTypeTo, searchType, dateOfСonversion])

	return <div className="converter">
		<h1 className="converter__title">
			Конвертер валют
		</h1>

		<form className="form">
			<div className="form__containers">
				<div className="form__choice">
					<Input value={amountFromValueChanging || 0} id="from" labelText="У меня есть" register={register("amount-from")} />
					<Select defaultValue="RUB" className="form__select" register={register("currency-type-from")} />
				</div>

				<div className="form__choice">
					{/* value={currency * amountFromValue || 0} */}
					<Input value={amountToValueChanging || 0} id="to" labelText="Хочу приобрести" register={register("amount-to")} />
					<Select defaultValue="USD" className="form__select" register={register("currency-type-to")} />
				</div>
			</div>

			<div className="form__containers">
				<Date register={register("date-of-conversion")} />
				<Button className="form__button" title="Сохранить результат" />
			</div>		
		</form>

		<section className="history">
			<h2 className="history__title">
				История конвертаций
			</h2>

			<div className="operations">
				<section>
					<span>25.11.2020</span>
					<span>1000 RUB</span>
					<span>13,1234 USD</span>
				</section>

				<section>
					<span>25.11.2020</span>	
					<span>1000 RUB</span>
					<span>13,1234 USD</span>
				</section>
			</div>

			<Button className="history__button" title="Очистить историю" />
		</section>
	</div>
})