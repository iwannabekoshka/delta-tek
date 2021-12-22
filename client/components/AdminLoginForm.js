import {useState} from "react";


export default function AdminLoginForm(props) {
	const [formData, setFormData] = useState({login: '', password: ''})

	const submitFormLogin = (event) => {
		event.preventDefault()

		props.submitFormLogin(formData)
	}

	const changeFormData = (event) => {
		const value = event.target.value
		const id = event.target.id

		setFormData((prev) => {
			return {...prev, [id]: value}
		})
	}

	return (<>
		<form onSubmit={submitFormLogin} className="w-50 mx-auto">
			<div className="mb-3">
				<label htmlFor="login" className="form-label">Логин</label>
				<input
					type="text"
					className="form-control"
					id="login"
					value={formData.login}
					onChange={changeFormData}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="password" className="form-label">Пароль</label>
				<input
					type="password"
					className="form-control"
					id="password"
					value={formData.password}
					onChange={changeFormData}
				/>
			</div>
			<button type="submit" className="btn btn-primary">Войти</button>
		</form>
	</>)
}