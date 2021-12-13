import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Layout({ children, cartCounter }) {
    return (
        <>
            <div className="layout">
                <Header cartCounter={cartCounter}/>
                    <div className="wrapper">{children}</div>
                <Footer />
            </div>

            <style jsx>{`
                .layout {
                    display: flex;
                    flex-direction: column;
                }
                .wrapper {
                    flex-grow: 1;
                    min-height: 90vh;
                }
            `}</style>
        </>
    )
}