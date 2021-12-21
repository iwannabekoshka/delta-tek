import Link from 'next/link'

export default function ProductCard(props) {
	const addCartItem = () => {
		props.addCartItem(props.id)
	}

	return (
		<>
			<div className="card">
				<div className="card-img" />
				<div className="card-body">
					<h5 className="card-title">{props.title}</h5>
					<p className="card-text">{props.text}</p>
					<div className="card-buttons">
						<Link href={`/product/${props.id}`}>
							<a className="btn btn-primary">Read more</a>
						</Link>
						<button className="btn btn-success" onClick={addCartItem}>Add to cart</button>
					</div>
				</div>
			</div>

			<style jsx>{`
				.card {
					height: 100%;
					box-shadow: 0 2px 4px rgba(0,0,0, .2);
				}
				.card-img {
					height: 400px;
					background-image: url(${props.img || '/img/flashhider.png'});
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
				.card-body {
					display: flex;
					flex-direction: column;
				}
				.card-text {
					flex-grow: 1;
				}
				.card-buttons {
					display: flex;
					justify-content: space-between;
				}
			`}</style>
		</>
	)
}