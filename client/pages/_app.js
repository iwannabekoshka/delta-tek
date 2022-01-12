import '../styles/index.scss'
import {useEffect, useState} from "react";
import Layout from "../components/layouts/Layout";

function MyApp({Component, pageProps}) {
	useEffect(() => {
		import("bootstrap/dist/js/bootstrap");
	}, []);

	const [cartItems, setCartItems] = useState([]);

	const addCartItem = (item) => {
		setCartItems(prev => {
			const cur = [...new Set([...prev, item])]
			return cur
		})
	}

	const removeItem = (id) => {
		setCartItems(prev => {
			const cur = [...prev].filter(itemId => itemId != id)
			return cur
		})
	}

	const changeItemCount = (id, count) => {
		setCartItems(prev => {
			const cur = [...prev].map(prevItem => {
				if (prevItem._id === id) {
					return {...prevItem, count: count}
				}
				return prevItem
			})
			return cur
		})
	}

	return (
		<>
			<Layout cartItems={cartItems}>
				<Component
					{...pageProps}
					addCartItem={addCartItem}
					removeItem={removeItem}
					cartItems={cartItems}
					changeItemCount={changeItemCount}
				/>
			</Layout>
		</>
	)
}

export default MyApp
