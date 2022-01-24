import Section from "../../../components/layouts/Section";
import {useEffect, useState} from "react";


export default function ProductEdit(props) {
	const [product, setProduct] = useState(props.product)
	const [specification, setSpecification] = useState('')
	const [specificationValue, setSpecificationValue] = useState('')
	const [specifications, setSpecifications] = useState([])

	let accessToken, tokenType
	useEffect(() => {
		accessToken = sessionStorage.getItem('accessToken')
		tokenType = sessionStorage.getItem('tokenType')

		fetch(`http://localhost:3300/api/specifications`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${tokenType} ${accessToken}`
			},
		}).then(res => res.json())
			.then(res => {
				setSpecifications(prev => {
					return res
				})
			})


	}, [])

	console.log(specifications)

	const submitEditForm = (event) => {
		event.preventDefault()

		console.log(product)
	}

	const changeProductData = event => {
		const id = event.target.id
		const value = id === 'files' ? [...event.target.files] : event.target.value

		setProduct((prev) => {
			return {...prev, [id]: value}
		})
	}

	const addSpecification = async () => {
		if (!specification.trim()) return

		setProduct(prev => {
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

		if (specifications.length && specifications.find(spec => spec.name === specification)) return

		fetch(`http://localhost:3300/api/specifications`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${sessionStorage.getItem('tokenType')} ${sessionStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				name: specification
			}),
		})
			.then(res => res.json())
			.then(res => {
				return {

				}
			})


	}

	const deleteSpecification = (spec) => {
		setProduct(prev => {
			return {
				...prev,
				specifications: [...prev.specifications].filter(s => s.name !== spec)
			}
		})
	}

	return (
		<div className="container">
			<form
				className={`border shadow-sm rounded-2 p-2 bg-white mb-2`}
				onSubmit={submitEditForm}
			>
				<h3>Редактирование товара</h3>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">Наименование</label>
					<input
						type="text"
						className="form-control"
						id="name"
						value={product.name}
						onChange={changeProductData}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">Описание</label>
					<textarea
						className="form-control"
						id="description"
						value={product.description}
						onChange={changeProductData}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="file" className="form-label d-block">Изображение</label>
					<img className="d-block mb-3" src={`/${product.image}`} alt={product.name} width="300"/>
					<input
						className="form-control"
						type="file"
						id="files"
						accept="image/*"
						onChange={changeProductData}
						multiple
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="text" className="form-label">Цена</label>
					<input
						type="number"
						className="form-control"
						id="price"
						value={product.price}
						onChange={changeProductData}
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
							autoComplete="off"
						/>
						<datalist id="specifications-list">
							{specifications.length && specifications.map(spec => {
								return <option value={spec.name} key={spec._id}/>
							})}
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
						{product?.specifications.map(specification => {
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
					<button type="submit" className="btn btn-primary">Сохранить</button>
				</div>
			</form>
		</div>
	)
}

export async function getServerSideProps(context) {
	const res = await fetch(`http://localhost:3300/api/products/${context.params.id}`)
	const data = await res.json()

	// if (!data) {
	//     return {
	//         notFound: true,
	//     }
	// }

	return {
		props: {
			product: data
		}, // will be passed to the page component as props
	}
}