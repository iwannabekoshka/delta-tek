import React, {useEffect} from 'react';
import Section from "../components/layouts/Section";

function Purchase(props) {
	useEffect(() => {
		props.clearCart()
	}, [])

	return (
		<Section title="Thank you for purchase">
			<div className="container">

			</div>
		</Section>
	);
}

export default Purchase;