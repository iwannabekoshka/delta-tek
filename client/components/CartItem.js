import Link from 'next/link'
import {useState} from "react";

export default function CartItem(props) {
	const [itemCount, setItemCount] = useState(props.item.count)

	const changeItemCount = (event) => {
		const count = +event.target.value

		setItemCount(prev => {
			return count
		})

		props.changeItemCount(props.item._id, count)
	}

	const removeItem = () => {
		props.removeItem(props.item)
	}

	let correctPrice
	let chosenThread
	if (props.item.chosenThread) {
		correctPrice = props.item.chosenThread.price
		chosenThread = props.item.chosenThread.value
	} else if (props.item.thread) {
		correctPrice = props.item.thread.sort((a,b) => a-b)[0].price
		chosenThread = props.item.thread.sort((a,b) => a-b)[0].value
	} else {
		correctPrice = props.item.price
	}

	return (<>
		<li className="list-group-item ">
			<div className="d-flex align-items-center justify-content-between mb-2">
				<Link href={`/product/${props.item._id}`}>
					<a>
						<img src={props.item.images[0]} />
					</a>
				</Link>
				<p>
					{props.item.title}
				</p>
				<p>
					{chosenThread && <>
						{chosenThread}: {correctPrice}$
					</>}
					{!chosenThread && <>
						{correctPrice}$
					</>}
				</p>
				<button className="btn btn-danger" onClick={removeItem}>Remove</button>
			</div>
			<div className="d-flex justify-content-end">
				<label htmlFor="count" className="form-label me-2">Count:</label>
				<input
					type="number"
					className="form-control"
					id="count"
					value={itemCount || 1}
					onChange={changeItemCount}
					min={1}
				/>
			</div>
		</li>

		<style jsx>{`
			img {
				height: 100px;
				width: 100px;
			}
			input {
				width: 70px;
			}
	`}</style>
	</>)
}