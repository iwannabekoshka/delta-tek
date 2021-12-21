

export default function CartItem(props) {
	const removeItem = () => {
		props.removeItem(props.item)
	}

	return (<>
		<li className="list-group-item d-flex align-items-center justify-content-between">
			{props.item}
			<button className="btn btn-danger" onClick={removeItem}>Remove</button>
		</li>
	</>)
}