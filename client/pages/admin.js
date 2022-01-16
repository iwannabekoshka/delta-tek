import {env} from 'process'
import {Tab, Tabs} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import AdminLoginForm from '../components/AdminLoginForm'
import AdminAddProductForm from '../components/AdminAddProductForm'
import axios from 'axios';
import Link from "next/link";

// const BACK_HOST = process.env.BACK_HOST
// const BACK_PORT = process.env.BACK_PORT

export default function Admin(props) {
	const BACK_HOST = props.BACK_HOST
	const BACK_PORT = props.BACK_PORT

	const [authorized, setAuthorized] = useState(false)
	const [products, setProducts] = useState(props.products)

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
													<div className="d-flex justify-content-end h-100 align-items-end">
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