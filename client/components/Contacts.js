

export default function Contacts() {
	return (<>
		<div className="row">
			<div className="col-12 col-md-6">
				<ul className="list-group list-group-flush">
					<li className="list-group-item d-flex align-items-center">
						<i className="bi bi-globe fs-3 me-2" />
						Address: Russia, Tula, st. Syzranskaya, 5A
					</li>
					<li className="list-group-item d-flex align-items-center">
						<i className="bi bi-envelope fs-3 me-2" />
						E-mail: info@delta-tek.ru
					</li>
					<li className="list-group-item d-flex align-items-center">
						<i className="bi bi-whatsapp fs-3 me-2" />
						Whatsapp: +74872792818
					</li>
				</ul>
			</div>
			<div className="col-12 col-md-6">
				<iframe
					src="https://yandex.ru/map-widget/v1/?um=constructor%3A01e72b9c5a60031b358bf373c4df10aadf3a24b71d16c0849cd89a5929039d27&amp;source=constructor"
					width="100%" height="300" frameBorder="0" />
			</div>
		</div>
	</>)
}