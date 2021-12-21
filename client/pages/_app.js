import '../styles/index.scss'
import {useEffect, useState} from "react";
import Layout from "../components/layouts/Layout";

function MyApp({Component, pageProps}) {
	useEffect(() => {
		import("bootstrap/dist/js/bootstrap");

		window.sessionStorage.setItem('cartItems', [].toString())
	}, []);

	const [cartItems, setCartItems] = useState([]);

	const addCartItem = (id) => {
		setCartItems(prev => {
			const cur = [...new Set([...prev, id])]
			sessionStorage.setItem('cartItems', cur.toString())
			return cur
		})
	}

	const removeItem = (id) => {
		setCartItems(prev => {
			const cur = [...prev].filter(itemId => itemId != id)
			sessionStorage.setItem('cartItems', cur.toString())
			return cur
		})
	}

	return (
		<>
			<Layout cartItems={cartItems}>
				<Component {...pageProps} addCartItem={addCartItem} removeItem={removeItem}/>
			</Layout>
		</>
	)
}

export default MyApp
