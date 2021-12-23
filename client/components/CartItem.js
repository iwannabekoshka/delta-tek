

export default function CartItem(props) {
	const removeItem = () => {
		props.removeItem(props.item)
	}

	let image
	switch (props.item) {
		case '1':
			image = "/img/flashhider.png"
			break
		case '2':
			image = "/img/flashhider2.png"
			break
		case '3':
			image = "/img/flashhider3.png"
			break
		default:
			image = "/img/flashhider.png"
			break
	}

	return (<>
		<li className="list-group-item d-flex align-items-center">
			<img src={image} className="me-2" alt="Cart product"/>
			{props.item}
			<div className="px-2" />
			{props.item}00$
			<button className="btn btn-danger ms-auto" onClick={removeItem}>Remove</button>
		</li>

		<style jsx>{`
			.list-group-item img {
				width: 100px;
			}
		`}</style>
	</>)
}