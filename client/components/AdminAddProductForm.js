import {useState} from "react";


export default function AdminAddProductForm(props) {
	const [formData, setFormData] = useState({name: '', description: '', image: null, price: '', specifications: []})
	const [specification, setSpecification] = useState('')
	const [specificationValue, setSpecificationValue] = useState('')

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

		console.log(formData)

		props.submitAddForm({...formData, ...additionalMock})
	}

	const addSpecification = () => {
		if (!specification.trim()) return

		setFormData(prev => {
			const obj = {}
			obj.name = specification
			obj.value = specificationValue

			let spec = [obj, ...prev.specifications]

			spec = spec.filter((value, index, self) =>
					index === self.findIndex((t) => (
						t.name === value.name
					))
			)

			return {
				...prev,
				specifications: spec
			}
		})
	}

	const deleteSpecification = (spec) => {
		setFormData(prev => {
			return {
				...prev,
				specifications: [...prev.specifications].filter(s => s.name !== spec)
			}
		})
	}

	return (<>
		<form
			className={`border shadow-sm rounded-2 p-2 bg-white mb-2`}
			onSubmit={submitAddForm}
		>
			<h3>Добавление товара</h3>
			<div className="mb-3">
				<label htmlFor="name" className="form-label">Наименование</label>
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
			<div className="mb-3 row">
				<div className="col">
					<label htmlFor="specification" className="form-label">Характеристика</label>
					<input
						className="form-control"
						id="specification"
						list="specifications-list"
						value={specification}
						onChange={(event) => setSpecification(event.target.value)}
					/>
					<datalist id="specifications-list">
						<option value="Test 1" />
						<option value="Test 2" />
					</datalist>
				</div>
				<div className="col">
					<label htmlFor="specificationValue" className="form-label">Значение</label>
					<input
						type="text"
						className="form-control"
						id="specificationValue"
						value={specificationValue}
						onChange={(event) => setSpecificationValue(event.target.value)}
					/>
				</div>
				<div className="col d-flex align-items-end">
					<button type="button" className="btn btn-primary" onClick={addSpecification}>Добавить характеристику</button>
				</div>
			</div>
			<div className="mb-3">
				<label className="form-label">Характеристики</label>
				<ul className='list-group shadow-sm rounded-2'>
					{formData.specifications.map(specification => {
							return  (
								<li className='list-group-item' key={specification.name}>
									<div className="row">
										<div className="col">
											<b>{specification.name}</b>: {specification.value}
										</div>
										<div className="col d-flex justify-content-end">
											<button type="button" className="btn btn-danger" onClick={() => deleteSpecification(specification.name)}>Удалить</button>
										</div>
									</div>
								</li>
							)
						}
					)}
				</ul>
			</div>

			<div className="d-flex justify-content-end">
				<button type="submit" className="btn btn-primary">Добавить</button>
			</div>
		</form>
	</>)
}