import Header from "./Header";
import Footer from "./Footer";

export default function Layout(props) {

	return (
		<>

			<Header cartItems={props?.cartItems}/>
			<main>
				{props.children}
			</main>
			<Footer/>


			<style jsx>{`
              main {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
              }
			`}</style>
		</>
	)
}