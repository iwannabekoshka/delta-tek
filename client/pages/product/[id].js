import Section from "../../components/layouts/Section";
import {useRouter} from "next/router";


export default function Product(props) {
	const inCart = props.cartItems.filter(item => item._id === props.product._id).length>0

	const addCartItem = () => {
		props.addCartItem(props.product)
	}

	return (<>
		<Section title={`${props.product.name}`}>
			<div className="container">
				<div className="row mb-4">
					<div className="col-12 col-md-6">
						<div className="item-img">
							<img src="https://via.placeholder.com/600" className="img-fluid" alt="Good"/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="my-2 d-flex justify-content-between align-items-center">
							<b className="me-2 fs-2">
								Price: {props.product.price}$
							</b>
							<button className={`btn btn-success ${inCart && 'disabled'}`} onClick={addCartItem}>
								{inCart ? 'In Cart' : 'Add to Cart'}
							</button>
						</div>
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