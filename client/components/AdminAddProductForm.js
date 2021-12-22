import {useState} from "react";


export default function AdminAddProductForm(props) {
	const [formData, setFormData] = useState({name: '', description: '', image: null, price: ''})

	const changeFormData = (event) => {
		const id = event.target.id
		const value = id === 'image' ? event.target.files[0] :event.target.value

		setFormData((prev) => {
			return {...prev, [id]: value}
		})
	}

	const submitAddForm = (event) => {
		event.preventDefault()

		const additionalMock = {

			"admin_id": "61c364632d764f622c80a2b8"
		}

		props.submitAddForm({...formData, ...additionalMock})
	}

	return (<>
		<form
			className={`border shadow-sm rounded-2 p-2 bg-white mb-2 ${!props.addFormVisible && 'collapse'}`}
			onSubmit={submitAddForm}
		>
			<div className="mb-3">
				<label htmlFor="text" className="form-label">Наименование</label>
				<input
					type="text"
					className="form-control"
					id="name"
					value={formData.name}
					onChange={changeFormData}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="description" className="form-label">Описание</label>
				<textarea
					className="form-control"
					id="description"
					value={formData.description}
					onChange={changeFormData}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="image" className="form-label">Изображение</label>
				<input
					className="form-control"
					type="file"
					id="image"
					accept="image/*"
					onChange={changeFormData}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="text" className="form-label">Цена</label>
				<input
					type="text"
					className="form-control"
					id="price"
					value={formData.price}
					onChange={changeFormData}
				/>
			</div>
			<div className="d-flex justify-content-end">
				<button type="submit" className="btn btn-primary">Добавить</button>
			</div>
		</form>
	</>)
}