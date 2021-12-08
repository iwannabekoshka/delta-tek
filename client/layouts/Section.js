import styled from "styled-components"

const SectionWrapper = styled.div`
    padding: 75px 0;
`

export default function Section({ classes, children }) {
    return (
        <SectionWrapper className={classes}>
            {children}
        </SectionWrapper>
    )
}