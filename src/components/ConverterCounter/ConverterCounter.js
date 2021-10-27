import {Fragment, memo, useCallback, useEffect, useMemo, useState} from 'react'
import axios from 'axios'
import {Button} from '../common/Button/Button'
import {Date} from '../common/Date/Date'
import dayjs from 'dayjs'
import {Icon} from '../common/Icon/Icon'
import {Input} from '../common/Input/Input'
import {Select} from '../common/Select/Select'
import {useForm} from 'react-hook-form'
import {v4 as uuidv4} from 'uuid';
import sprite from '../../assets/sprite.svg'
import './converterCounter.scss'

export const ConverterCounter = memo(function ConverterCounter({className}) {
	const [currency, setCurrency] = useState(0)
	const [conversionHistory, setConversionHistory] = useState([])
	const {handleSubmit, register, watch, formState, setValue} = useForm();
	const amountFromValue = watch("amount-from")
	const amountToValue = watch("amount-to")
	const currencyTypeFrom = watch("currency-type-from")
	const currencyTypeTo = watch("currency-type-to")
	const dateOfСonversion = watch("date-of-conversion")
	const dateNow = dayjs().format('YYYY-MM-DD')
	const searchType = dateOfСonversion === dateNow ? 'latest' : 'historical'

	const amountFromValueChanging = useMemo(() => {
		if (formState.name === 'amount-from' && formState.isDirty) {
			setValue("amount-to", (amountFromValue * currency).toFixed(2))
			return amountFromValue
		}

		if (!amountFromValue) {
			return ''
		}

		return (amountToValue * currency).toFixed(2)
	}, [amountToValue, amountFromValue, formState.name, formState.isDirty, currency, setValue])

	const amountToValueChanging = useMemo(() => {
		if (formState.name === 'amount-to' && formState.isDirty) {
			setValue("amount-from", (amountToValue * currency).toFixed(2))
			return amountToValue
		}

		if (!amountToValue) {
			return ''
		}

		return (amountFromValue * currency).toFixed(2)
	}, [amountToValue, amountFromValue, formState.name, formState.isDirty, currency, setValue])

	useEffect(() => {
		const getCurrencyData = async () => {
			try {	
				if (!currencyTypeFrom || !currencyTypeTo) {
					return 
				}

				if (currencyTypeFrom === currencyTypeTo) {
					return
				}

				const response = await axios.get(`https://freecurrencyapi.net/api/v2/latest?apikey=${process.env.CURRENCY_API}&base_currency=${currencyTypeFrom}&date_from=${dateOfСonversion}&date_to=${dateOfСonversion}`);
				return response.data
			} catch (error) {
				console.error(error);
			}
		}

		getCurrencyData().then(data => {
			if (data && searchType === 'historical') {
				setCurrency(data.data[`${dateOfСonversion}`][`${currencyTypeTo}`])
			}
 			
			if (data && searchType === 'latest') {
				setCurrency(data.data[`${currencyTypeTo}`])
			}
		})
	}, [currencyTypeFrom, currencyTypeTo, searchType, dateOfСonversion])

	const onSubmit = data => {
		if (conversionHistory.length >= 10) {
			conversionHistory.pop()
		}

		setConversionHistory(previous => [data, ...previous]);
	}

	const clearHistory = useCallback(() => {
		setConversionHistory([])
	}, [])
	
	return <div className="converter">
		<h1 className="converter__title">
			Конвертер валют
		</h1>

		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<div className="form__containers">
				<div className="form__choice">
					<Input value={amountFromValueChanging} id="from" labelText="У меня есть" register={register("amount-from")} />
					<Select defaultValue="RUB" className="form__select" register={register("currency-type-from")} />
				</div>

				<div className="form__arrows-container">
					<Icon className="form__arrow" name={`${sprite}#conversion-arrow`} color="none" width="53" height="18" />	
					<Icon className="form__arrow form__arrow--2" name={`${sprite}#conversion-arrow`} color="none" width="53" height="18" />	
				</div>

				<div className="form__choice">
					<Input value={amountToValueChanging} id="to" labelText="Хочу приобрести" register={register("amount-to")} />
					<Select defaultValue="USD" className="form__select" register={register("currency-type-to")} />
				</div>
			</div>

			<div className="form__containers">
				<Date register={register("date-of-conversion")} />
				<Button disabled={!Boolean(amountFromValueChanging) || !Boolean(amountToValueChanging)} className="form__button" title="Сохранить результат" />
			</div>		
		</form>

		<section className="history">
			<h2 className="history__title">
				История конвертаций
			</h2>

			<div className="operations-history">
				{Boolean(conversionHistory.length) && <Fragment>
					<section className="operations-history__section">
						{(conversionHistory.map(item => {
							return <div className="operations-history__container" key={uuidv4()}>
								<span className="operations-history__date">{item['date-of-conversion']}</span>

								<div className="conversion">
									<span className="conversion__from">
										{item['amount-from']} {item['currency-type-from']}
										<Icon className="conversion__arrow-history" name={`${sprite}#history-conversion-arrow`} color="none" width="41" height="18" />	
									</span>

									<span className="conversion__to">{item['amount-to']} {item['currency-type-to']}</span>
								</div>
							</div>
						})).slice(0, 5)}
					</section>

					<section className="operations-history__section">
						{(conversionHistory.map(item => {
							return <div className="operations-history__container" key={uuidv4()}>
								<span className="operations-history__date">{item['date-of-conversion']}</span>

								<div className="conversion">
									<span className="conversion__from">
										{item['amount-from']} {item['currency-type-from']}
										<Icon className="conversion__arrow-history" name={`${sprite}#history-conversion-arrow`} color="none" width="41" height="18" />	
									</span>

									<span className="conversion__to">{item['amount-to']} {item['currency-type-to']}</span>
								</div>
							</div>
						})).slice(5, 10)}
					</section>
				</Fragment>}

				{!Boolean(conversionHistory.length) && <p className="operations-history__no">Пусто</p>}
			</div>

			<Button className="history__button" disabled={!Boolean(conversionHistory.length)} onClick={clearHistory} title="Очистить историю" />
		</section>
	</div>
})