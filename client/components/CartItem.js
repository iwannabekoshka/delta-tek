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

	return (<>
		<li className="list-group-item ">
			<div className="d-flex align-items-center justify-content-between mb-2">
				<Link href={`/product/${props.item._id}`}>
					<a>
						<img src={props.item.img} />
					</a>
				</Link>
				<p>
					{props.item.title}
				</p>
				<p>
					{props.item.price}$
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