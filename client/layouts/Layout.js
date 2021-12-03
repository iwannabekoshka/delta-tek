import Header from "../components/Header"
import styled from 'styled-components'

const Main = styled.div`
    padding-top: 5rem;
`


export default function Layout({ children }) {
    return (
        <>
            <Header />
            <Main>{children}</Main>
            {/* <Footer /> */}
        </>
    )
}