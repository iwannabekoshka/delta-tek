import Section from "../../components/layouts/Section";


export default function Product(props) {
	const product = props.product[0]

	return (<>
		<Section title={`Product ${product.title}`}>
			<div className="container">
				<div className="row mb-4">
					<div className="col-12 col-md-6">
						<div className="item-img">
							<img src={product.image} className="img-fluid" alt="Good"/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<ul className="list-group list-group-flush border shadow-sm rounded-2">
							<li className="list-group-item">An item</li>
							<li className="list-group-item">A second item</li>
							<li className="list-group-item">A third item</li>
							<li className="list-group-item">A fourth item</li>
							<li className="list-group-item">And a fifth one</li>
						</ul>
					</div>
				</div>
				<div className="row">
					<p className="item-text border shadow-sm rounded-2 p-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, blanditiis cum dolore illo iste non recusandae sequi veritatis? Doloribus, iure?</p>
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

export async function getServerSideProps({ query }) {
	const res = await fetch(`http://localhost:3200/goods?id=${query.id}`)
	const product = await res.json()

	return {
		props: {
			product: product
		}
	}
}