import {useState} from "react";


export default function AdminAddProductForm(props) {
	const [formData, setFormData] = useState({title: '', description: '', image: null})

	const changeFormData = (event) => {
		const id = event.target.id
		const value = id === 'image' ? event.target.files[0] :event.target.value

		setFormData((prev) => {
			return {...prev, [id]: value}
		})
	}

	const submitAddForm = (event) => {
		event.preventDefault()

		props.submitAddForm(formData)
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
					id="title"
					value={formData.title}
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
			<div className="d-flex justify-content-end">
				<button type="submit" className="btn btn-primary">Добавить</button>
			</div>
		</form>
	</>)
}