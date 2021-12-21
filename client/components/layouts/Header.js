import Image from 'next/image'
import Link from 'next/link'
import DeltatekLogo from '../../public/img/logo-mini.png'

export default function Header(props) {


	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
				<div className="container">
					<Link href="/">
						<a className="navbar-brand">
							<Image src={DeltatekLogo}/>
						</a>
					</Link>

					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<Link href="/">
								<a className="nav-link">
									Home
								</a>
							</Link>
						</li>
					</ul>

					<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
							data-bs-target="#navbar-list" aria-controls="navbarSupportedContent"
							aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"/>
					</button>

					<div className="collapse navbar-collapse" id="navbar-list">
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link" href="mailto:info@delta-tek.ru">
									<i className="bi bi-envelope me-2 fs-3" />
									info@delta-tek.ru
								</a>
							</li>
							<li className="nav-item me-0 me-md-4">
								<a className="nav-link" href="tel:+74872792818">
									<i className="bi bi-telephone me-2 fs-3" />
									+74872792818
								</a>
							</li>
							<li className="nav-item">
								<Link href="/cart">
									<a className="nav-link cart position-relative">
										<i className="bi bi-cart3 me-2 fs-3" />
										Cart
										<span className="cart-items">{props?.cartItems.length}</span>
									</a>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			<style jsx>{`
		  		.nav-link,
		   		.nav-item {
					display: flex !important;
					align-items: center;
		  		}
		  		.cart-items {
		  			position: absolute;
		  			display: flex;
		  			align-items: center;
		  			justify-content: center;
		  			bottom: 0;
		  			right: -10px;
		  			
		  			width: 16px;
		  			height: 16px;
		  			padding: 2px;
		  			font-size: 12px;
		  			color: white;
		  			border-radius: 9999px;
		  			background-color: red;
		  		}
			`}</style>
		</>

	)
}
