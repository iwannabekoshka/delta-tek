import styled from "styled-components"

const FooterWrapper = styled.footer`
    padding: 50px 0;
`

export default function Footer() {
    return (
        <FooterWrapper className="bg-dark text-light">
            <div className="container text-center">
                © 2021 ООО "Дельта-Тек". Все права защищены
            </div>
        </FooterWrapper>
    )
}