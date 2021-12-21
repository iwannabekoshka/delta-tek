

export default function Partners() {

	return (<>
		<div className="row">
			<div className="col-6 col-md-3">
				<div className="partner-card">
					<img src='/img/partners/kalash.jpg' className="partner img-fluid" alt="Kalashnikov concern"/>
				</div>
			</div>
			<div className="col-6 col-md-3">
				<div className="partner-card">
					<img src='/img/partners/aurora.jpg' className="partner img-fluid" alt="Aurora"/>
				</div>
			</div>
			<div className="col-6 col-md-3">
				<div className="partner-card">
					<img src='/img/partners/russia_ipsc.jpg' className="partner img-fluid" alt="Russia IPSC"/>
				</div>
			</div>
			<div className="col-6 col-md-3">
				<div className="partner-card">
					<img src='/img/partners/linia_ognya.jpg' className="partner img-fluid" alt="Fireline"/>
				</div>
			</div>
			<div className="col-6 col-md-3">
				<div className="partner-card">
					<img src='/img/partners/pro_shooter.jpg' className="partner img-fluid" alt="Pro Shooter"/>
				</div>
			</div>
			<div className="col-6 col-md-3">
				<div className="partner-card">
					<img src='/img/partners/12_calibr.jpg' className="partner img-fluid" alt="12 Calibr"/>
				</div>
			</div>
			<div className="col-6 col-md-3">
				<div className="partner-card">
					<img src='/img/partners/iolla.jpg' className="partner img-fluid" alt="Iolla"/>
				</div>
			</div>
			<div className="col-6 col-md-3">
				<div className="partner-card">
					<img src='/img/partners/sturman.jpg' className="partner img-fluid" alt="Sturman"/>
				</div>
			</div>
		</div>

		<style jsx>{`
			.row > * {
				display: flex;
				align-items: stretch;
				
				padding: 1rem;
				
				aspect-ratio: 1/1;
			}
			.partner-card {
				display: flex;
				align-items: center;
				justify-content: center;
				
				width: 100%;
				padding: 1rem;
				border-radius: 8px;
				
				box-shadow: 0 2px 4px rgba(0,0,0, .2);
			}
		`}</style>
	</>)
}