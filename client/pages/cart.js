import Layout from "../components/layouts/Layout";
import Section from "../components/layouts/Section";
import {useEffect, useState} from "react";
import CartItem from "../components/CartItem";
import {useRouter} from "next/router";


export default function Cart(props) {
	const [orderFormFields, setOrderFormFields] = useState(
		props.orderFormFields
			.sort((a,b) => {
				if ( a.number < b.number ){
					return -1;
				}
				if ( a.number > b.number ){
					return 1;
				}
				return 0;
			})
			.map(orderFormField => {
				return {...orderFormField, value: ''}
			})
	)

	const router = useRouter()

	let cartItems = props.cartItems

	const submitForm = (event) => {
		event.preventDefault();

		console.log(orderFormFields)

		// router.push('/purchase')
	}

	const changeOrderFormField = event => {
		const _id = event.target.id
		const value = event.target.value

		setOrderFormFields(prev => {
			return [...prev].map(orderFormField => {
				if (orderFormField._id === _id) {
					return {
						...orderFormField,
						value
					}
				}
				return orderFormField
			})
		})
	}

	return (
		<Section title="Cart">
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-6">
						<h3>Items</h3>

						<ul className="list-group list-group-flush border shadow-sm rounded-2">
							{cartItems.length
								? cartItems.map(item => {
									return <CartItem
										item={item}
										key={item._id}
										removeItem={props.removeItem}
										changeItemCount={props.changeItemCount}
									/>
								})
								: <p className="m-0 p-2 text-center">No items</p>
							}
						</ul>
					</div>
					<div className="col-12 col-md-6">
						{cartItems &&
							<>
								<h3>Order</h3>

								<form onSubmit={submitForm} className="border shadow-sm rounded-2 p-2 bg-white">
									{orderFormFields.map(orderFormField => {
										return (
											<div className="mb-3">
												<label htmlFor={orderFormField._id} className="form-label">{orderFormField.name}</label>
												<input
													type="text"
													className="form-control"
													id={orderFormField._id}
													value={orderFormField.value}
													onChange={changeOrderFormField}
												/>
											</div>
										)
									})}

									<div className="d-flex justify-content-end">
										<button type="submit" className="btn btn-primary">Submit</button>
									</div>
								</form>
							</>
						}
					</div>
				</div>
			</div>
		</Section>
	)
}

export async function getServerSideProps(context) {
	const orderForm = await fetch(`http://localhost:3300/api/order-form`)
	const orderFormFields = await orderForm.json()

	// if (!data) {
	//     return {
	//         notFound: true,
	//     }
	// }

	return {
		props: {
			orderFormFields,
			BACK_HOST: process.env.BACK_HOST,
			BACK_PORT: process.env.BACK_PORT
		}, // will be passed to the page component as props
	}
}