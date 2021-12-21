import Section from "../../components/layouts/Section";
import {useRouter} from "next/router";


export default function Product(props) {
	const router = useRouter()
	const {id} = router.query

	return (<>
		<Section title={`Product ${id}`}>
			<div className="container">
				<div className="row mb-4">
					<div className="col-12 col-md-6">
						<div className="item-img">
							<img src="https://via.placeholder.com/600" className="img-fluid" alt="Good"/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<ul className="list-group list-group-flush">
							<li className="list-group-item">An item</li>
							<li className="list-group-item">A second item</li>
							<li className="list-group-item">A third item</li>
							<li className="list-group-item">A fourth item</li>
							<li className="list-group-item">And a fifth one</li>
						</ul>
					</div>
				</div>
				<div className="row">
					<p className="item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, blanditiis cum dolore illo iste non recusandae sequi veritatis? Doloribus, iure?</p>
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