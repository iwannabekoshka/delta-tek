import Section from "../../components/layouts/Section";
import {useRouter} from "next/router";
import {useState} from "react";


export default function Product(props) {
	const [price, setPrice] = useState(props.product.thread?.sort((a,b)=>a.price-b.price)[0].price || props.product.price)
	const [threads, setThreads] = useState(props.product.thread?.map(thread => {
		return {...thread, checked: false}
	}).sort((a,b) => a.price-b.price) || [])

	const inCart = props.cartItems.filter(item => item._id === props.product._id).length>0

	const addCartItem = () => {
		props.addCartItem({...props.product, chosenThread: threads.filter(thread => thread.checked)[0]})
	}

	const changeThreadHandler = event => {
		const value = event.target.id

		setThreads(prev => {
			return [...prev].map(thread => {
				if (thread.value === value) {
					return {
						...thread,
						checked: true
					}
				}
				return {
					...thread,
					checked: false
				}
			})
		})

		setPrice(threads.filter(thread => thread.value === value)[0].price)
	}

	return (<>
		<Section title={`${props.product.name}`}>
			<div className="container">
				<div className="row mb-4">
					<div className="col-12 col-md-6">
						<div className="item-img">
							<img src={`/${props.product.image}`} className="img-fluid" alt="Good"/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="my-2 d-flex justify-content-between align-items-center">
							<b className="me-2 fs-2">
								Price: {price}$
							</b>
							<button className={`btn btn-success ${inCart && 'disabled'}`} onClick={addCartItem}>
								{inCart ? 'In Cart' : 'Add to Cart'}
							</button>
						</div>
						<div className="">
							{threads.length > 0 && <h3>Threads:</h3>}
							{threads.length > 0 && threads.map((thread, index) => {
								return (
									<div className="form-check mb-2">
										<input className="form-check-input" type="radio" name="threads"
										       id={thread.value}
										       checked={thread.checked}
										       onChange={changeThreadHandler}
										/>
										<label className="form-check-label" htmlFor={thread.value}>
											{thread.value}: {thread.price}$
										</label>
									</div>
								)
							})}
						</div>
						<h3>Specifications</h3>
						<ul className="list-group list-group-flush border shadow-sm rounded-2">
							{props.product.specifications.map(specification => {
								return  <li className="list-group-item" key={specification._id}>
											<b>{specification.name}:</b> {specification.value}
										</li>
							})}
						</ul>
					</div>
				</div>
				<div className="row">
					<p className="item-text border shadow-sm rounded-2 p-3">
						{props.product.description}
					</p>
				</div>
			</div>
		</Section>

		<style jsx>{`
			.item-img {
				width: 80%;
				margin: 0 auto;
			}
		`}</style>
	</>)
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