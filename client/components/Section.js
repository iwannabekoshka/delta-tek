import { Container } from 'react-bootstrap'

export default function Section({title="Title", children}) {
    return (
        <>
            <section className="border-bottom">
                <Container>
                    <h2>{title}</h2>
                    <div className="section__inner">

                        {children}
                    </div>
                </Container>
            </section>

            <style jsx>{`
                section {
                    display: flex;
                    flex-direction: column;
                    padding: 2.5rem 0;
                    //height: 90vh;
                }
                .section__inner {
                    position: relative;
                    // SectionHeight - (2*SectionPadding + TitleMargin + TitleFontSize)
                    //height: calc(90vh - (2*2.5rem + 1rem + 2rem));
                }

                h2 {
                    margin-bottom: 1rem;
                }
            `}</style>
        </>
    )
}