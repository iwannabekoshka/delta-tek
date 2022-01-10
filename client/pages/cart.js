import Layout from "../components/layouts/Layout";
import Section from "../components/layouts/Section";
import {useEffect, useState} from "react";
import CartItem from "../components/CartItem";


export default function Cart(props) {
	const [email, setEmail] = useState('')
	const [index, setIndex] = useState('')
	const [phone, setPhone] = useState('')
	const [address, setAddress] = useState('')

	let cartItems = props.cartItems
	console.log(cartItems)

	const changePhone = (event) => {
		setPhone(prev => {
			return event.target.value
		})
	}
	const changeEmail = (event) => {
		setEmail(prev => {
			return event.target.value
		})
	}
	const changeIndex = (event) => {
		setIndex(prev => {
			return event.target.value
		})
	}
	const changeAddress = (event) => {
		setAddress(prev => {
			return event.target.value
		})
	}

	const submitForm = (event) => {
		event.preventDefault();
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
										key={item.id}
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
									<div className="mb-3">
										<label htmlFor="email" className="form-label">Email address</label>
										<input
											type="email"
											className="form-control"
											id="email"
											value={email}
											onChange={changeEmail}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="index" className="form-label">Index</label>
										<input
											type="text"
											className="form-control"
											id="index"
											value={index}
											onChange={changeIndex}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="phone" className="form-label">Phone</label>
										<input
											type="phone"
											className="form-control"
											id="phone"
											value={phone}
											onChange={changePhone}
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="address" className="form-label">Address</label>
										<input
											type="address"
											className="form-control"
											id="address"
											value={address}
											onChange={changeAddress}
										/>
									</div>
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