

export default function Section({ children, title }) {


	return (
		<>
			<section className="mb-5">
				<div className="container">
					<h2 className="mb-4">{ title }</h2>
				</div>
				{ children }
			</section>
			<style jsx>{`
			`}</style>
		</>
	)
}