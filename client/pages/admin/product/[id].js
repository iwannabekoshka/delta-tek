import Section from "../../../components/layouts/Section";
import {useEffect, useState} from "react";
import axios from 'axios'


export default function ProductEdit(props) {
	const [product, setProduct] = useState(props.product)
	const [specification, setSpecification] = useState('')
	const [specificationValue, setSpecificationValue] = useState('')
	const [specifications, setSpecifications] = useState([])
	const [threadValue, setThreadValue] = useState('')
	const [threadPrice, setThreadPrice] = useState('')
	const [threads, setThreads] = useState(props.product.thread || [])

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

	const submitEditForm = (event) => {
		event.preventDefault()

		console.log(threads)

		const data = new FormData()
		data.append("admin_id", "61df1efa1db126637c7be44b")

		let obj = {
			...product,
			thread: [...threads],
			files: []
		}

		for (const key in obj) {
			if (key === 'specifications') {
				obj[key] = JSON.stringify(obj[key])
			}
			if (key === 'thread') {
				obj[key] = JSON.stringify(obj[key])
			}

			data.append(key, obj[key])
		}

		axios.put(
			`http://localhost:3300/api/products/${props.product._id}`,
			data,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': `${sessionStorage.getItem('tokenType')} ${sessionStorage.getItem('accessToken')}`
				}
			}
			)
			.then(res => console.log(res))
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

	const addThread = () => {
		if (!threadValue.trim()) return

		setThreads(prev => {
			const obj = {
				value: threadValue,
				price: threadPrice
			}
			let threadsLoc = [obj, ...prev]

			threadsLoc = threadsLoc.filter((value1, index, self) =>
					index === self.findIndex((t) => (
						t.value === value1.value
					))
			)

			return threadsLoc
		})
	}

	const deleteThread = (value) => {
		setThreads(prev => {
			return [...prev].filter(thread => thread.value !== value)
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

				{/*Резьба*/}
				<div className="mb-3 row">
					<div className="col">
						<label htmlFor="threadValue" className="form-label">Резьба</label>
						<input
							type="text"
							className="form-control"
							id="threadValue"
							value={threadValue}
							onChange={(event) => setThreadValue(event.target.value)}
						/>
					</div>
					<div className="col">
						<label htmlFor="threadPrice" className="form-label">Цена</label>
						<input
							type="number"
							className="form-control"
							id="threadPrice"
							value={threadPrice}
							onChange={(event) => setThreadPrice(event.target.value)}
						/>
					</div>
					<div className="col d-flex align-items-end">
						<button type="button" className="btn btn-primary" onClick={addThread}>Добавить резьбу</button>
					</div>
				</div>
				<div className="mb-3">
					<label className="form-label">Резьбы</label>
					<ul className='list-group shadow-sm rounded-2'>
						{threads && threads.map(thread => {
							return  (
								<li className='list-group-item' key={thread.value}>
									<div className="row">
										<div className="col">
											<b>{thread.value}</b>: {thread.price}$
										</div>
										<div className="col d-flex justify-content-end">
											<button type="button" className="btn btn-danger" onClick={() => deleteThread(thread.value)}>Удалить</button>
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