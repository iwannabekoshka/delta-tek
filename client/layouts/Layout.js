import Header from "../components/Header"
import Footer from "../components/Footer"
import styled from "styled-components"

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const MainWrapper = styled.div`
    flex-grow: 1;
    min-height: 90vh;
`

export default function Layout({ children }) {
    return (
        <LayoutWrapper>
            <Header />
            <MainWrapper>{children}</MainWrapper>
            <Footer />
        </LayoutWrapper>
    )
}