import {memo} from "react";
import './input.scss'

export const Input = memo(function Input({id, labelText, register, ...attributes}) {
	return <div className="container">
		<label className="container_label" htmlFor={id}>{labelText}</label>
		<input className="container__input" id={id} {...register} {...attributes} />
	</div>
})