
export default function Section({ classes, children }) {
    return (
        <>
            <section className="section">
                {children}
            </section>

            <style jsx>{`
                .section {

                }
            `}</style>
        </>
    )
}