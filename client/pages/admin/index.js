import {env} from 'process'
import {Tab, Tabs} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import AdminLoginForm from '../../components/AdminLoginForm'
import AdminAddProductForm from '../../components/AdminAddProductForm'
import axios from 'axios';
import Link from "next/link";

// const BACK_HOST = process.env.BACK_HOST
// const BACK_PORT = process.env.BACK_PORT

export default function Admin(props) {
	const BACK_HOST = props.BACK_HOST
	const BACK_PORT = props.BACK_PORT

	const [authorized, setAuthorized] = useState(false)
	const [products, setProducts] = useState(props.products)
	const [orderFormFields, setOrderFormFields] = useState([
		//TODO заменить на данные с сервера
		{
			id: "formField1",
			formFieldType: 'email',
			formFieldLabel: 'Email'
		},
		{
			id: "formField2",
			formFieldType: 'text',
			formFieldLabel: 'Name'
		}
	])
	const [addOrderFormItem, setAddOrderFormItem] = useState({
		formFieldType: '',
		formFieldLabel: ''
	})

	let accessToken, tokenType

	useEffect(() => {
		let wasAuthorized = sessionStorage.getItem('adminAuthorized')
		if (wasAuthorized === 'true') {
			setAuthorized(true)
		}

		accessToken = sessionStorage.getItem('accessToken')
		tokenType = sessionStorage.getItem('tokenType')
	}, [])

	const submitFormLogin = (formData) => {
		fetch(`http://${BACK_HOST}:${BACK_PORT}/api/auth/login`, {
		    method: 'POST',
		    headers: {
		        'Content-Type': 'application/json',
		    },
		    body: JSON.stringify(formData),
		})
			.then(res => res.json())
			.then(res => {
				const { accessToken, tokenType, statusCode } = res

				if (statusCode == 500) return

				props.setAuthParams(accessToken, tokenType)

				setAuthorized(true)
				sessionStorage.setItem('adminAuthorized', 'true')
			})
	}

	const submitAddForm = async (formData, data) => {
		axios.post(
			`http://${BACK_HOST}:${BACK_PORT}/api/products`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': `${sessionStorage.getItem('tokenType')} ${sessionStorage.getItem('accessToken')}`
				}
			}
		).then(res => {
			setProducts(prev => {
				return [...prev, res.data]
			})
		})

		// fetch(`http://${BACK_HOST}:${BACK_PORT}/api/products`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'multipart/form-data',
		// 		'Authorization': `${props.authParams.tokenType} ${props.authParams.accessToken}`
		// 	},
		// 	body: formData,
		// }).then(res => res.json())
		// 	.then(res => {})

		// setProducts(prev => {
		//     return [...prev, formData]
		// })
	}

	const deleteProduct = (_id) => {
		axios.delete(
			`http://${BACK_HOST}:${BACK_PORT}/api/products/${_id}`,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': `${sessionStorage.getItem('tokenType')} ${sessionStorage.getItem('accessToken')}`
				}
			}
		).then(res => {
			setProducts(prev => {
				return [...prev].filter(i => i._id !== _id)
			})
		})
	}

	const submitAddOrderFormField = (event) => {
		event.preventDefault()

		setOrderFormFields(prev => {
			return [
				//TODO заменить генерацию id
				{...addOrderFormItem, id: Math.random()},
				...prev
			]
		})
	}

	const changeAddOrderFormField = event=> {
		const id = event.target.id
		const value = event.target.value

		setAddOrderFormItem(prev => {
			return {
				...prev,
				[id]: value
			}
		})
	}

	const removeOrderFormField = (id) => {
		setOrderFormFields(prev => {
			return [...prev].filter(formField => formField.id !== id)
		})
	}

	const changeOrderFormField = (event, id) => {
		const type = event.target.id.substring(0, event.target.id.length - 1); //тк добавил в конец 2
		const value = event.target.value

		setOrderFormFields(prev => {
			return [...prev].map(formField => {
				if (formField.id === id) {
					return {
						...formField,
						[type]: value
					}
				}
				return formField
			})
		})
	}

	const submitOrderFormFields = () => {
		console.log(orderFormFields)
	}


	return (<>
		<div className='container pb-3'>
			{!authorized ?
				<AdminLoginForm
					submitFormLogin={submitFormLogin}
				/>
				:
				<Tabs defaultActiveKey='goods' className='mb-3'>
					<Tab eventKey='goods' title='Товары'>
						<AdminAddProductForm
							submitAddForm={submitAddForm}
							authParams={props.authParams}
						/>

						<h3>Товары</h3>
						<div className='row'>
							{products.map(product => {
									return (
										<div className="col-4 mb-2" key={product._id}>
											<div className="card">
												<div className="card-img"/>
												<div className="card-body">
													<h5 className="card-title">{product.name}</h5>
													<p className="card-text">{product.text}</p>
													<p className="card-text">Цена: {product.price}$</p>
													<p className="card-text">Описание: {product.description}</p>
													<ul className="list-group shadow-sm rounded-2 mb-2">
														{product.specifications.map(spec => {
															return (
																<li className="list-group-item" key={spec._id}>
																	<b>{spec.name}:</b> {spec.value}
																</li>
															)
														})}
													</ul>
													<div className="d-flex justify-content-between h-100 align-items-end">
														<Link href={`admin/product/${product._id}`}>
															<a className="btn btn-success">Редактировать</a>
														</Link>
														<button type="button" className="btn btn-danger" onClick={() => deleteProduct(product._id)}>Удалить</button>
													</div>
												</div>
											</div>

											<style jsx>{`
                                              .card {
                                                height: 100%;
                                                box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
                                              }
                                              
                                              .card-body {
                                                  display: flex;
                                                  flex-direction: column;
                                              }

                                              .card-img {
                                                height: 400px;
                                                background-image: url(${product.image || product.file || '/img/flashhider.png'});
                                                background-size: 100%;
                                                background-position: center;
                                                background-repeat: no-repeat;
                                              }

                                              @media (min-width: 768px) {
                                                .card-img {
                                                  height: 300px;
                                                  background-size: 80%;
                                                  background-position: top;
                                                }
                                              }
											`}</style>
										</div>
									)
								}
							)}
						</div>
					</Tab>
					<Tab eventKey='orders' title='Заказы'>
						<ul className='list-group shadow-sm rounded-2'>

						</ul>
					</Tab>
					<Tab eventKey='order-form' title='Форма заказа'>
						<form onSubmit={submitAddOrderFormField} className='border shadow-sm rounded-2 p-2 bg-white mb-2'>
							<h3>Добавление</h3>
							<div className="row mb-2">
								<div className="col">
									<label htmlFor="formFieldType" className="form-label">Тип поля</label>
									<select
										className="form-select"
										id="formFieldType"
										onChange={changeAddOrderFormField}
									>
										<option value="email">E-mail</option>
										<option value="text">Текст</option>
										<option value="address">Адрес</option>
										<option value="tel">Телефон</option>
									</select>
								</div>
								<div className="col">
									<label htmlFor="formFieldLabel" className="form-label">Название поля</label>
									<input
										id="formFieldLabel"
										type="text"
										className="form-control"
										onChange={changeAddOrderFormField}
									/>
								</div>
								<div className="col d-flex align-items-end justify-content-end">
									<button type="submit" className="btn btn-primary">Добавить</button>
								</div>
							</div>
						</form>
						<section className='border shadow-sm rounded-2 p-2 bg-white mb-2'>
							<h3>Поля формы заказа</h3>
							{orderFormFields.map(orderFormField => {
								return (
									<div className="row mb-2" key={orderFormField.id}>
										<div className="col">
											<label htmlFor="formFieldType2" className="form-label">Тип поля</label>
											<select
												id="formFieldType2"
												className="form-select"
												value={orderFormField.formFieldType}
												onChange={(event) => changeOrderFormField(event, orderFormField.id)}
											>
												<option value="email">E-mail</option>
												<option value="text">Текст</option>
												<option value="address">Адрес</option>
												<option value="tel">Телефон</option>
											</select>
										</div>
										<div className="col">
											<label htmlFor="formFieldLabel2" className="form-label">Название поля</label>
											<input
												id="formFieldLabel2"
												type="text"
												className="form-control"
												value={orderFormField.formFieldLabel}
												onChange={(event) => changeOrderFormField(event, orderFormField.id)}
											/>
										</div>
										<div className="col d-flex justify-content-end align-items-end">
											<button className="btn btn-danger" onClick={() => removeOrderFormField(orderFormField.id)}>Удалить</button>
										</div>
									</div>
								)
							})}
							<div className="d-flex justify-content-end mt-5">
								<button onClick={submitOrderFormFields} className="btn btn-primary">Сохранить</button>
							</div>
						</section>
					</Tab>
				</Tabs>
			}
		</div>
	</>)
}

export async function getServerSideProps(context) {
	const res = await fetch(`http://localhost:3300/api/products`)
	const data = await res.json()

	// if (!data) {
	//     return {
	//         notFound: true,
	//     }
	// }

	return {
		props: {
			products: data,
			BACK_HOST: process.env.BACK_HOST,
			BACK_PORT: process.env.BACK_PORT
		}, // will be passed to the page component as props
	}
}