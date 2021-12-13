import { Nav, Navbar, Container } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'

export default function Header({ cartCounter }) {
    console.log(cartCounter)


    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    {/* Logo */}
                    <Link href="/">
                        <a>
                            <Image 
                                src="/img/logo-mini.png" 
                                alt="Logo" 
                                width="64"
                                height="64"
                            />
                        </a>
                    </Link>
                    {/* // Logo */}

                    {/* Nav 1 */}
                    <Nav className="me-auto ms-2">
                        <Nav.Link>
                            <Link href="/#about">
                                <a>
                                    About
                                </a>
                            </Link>
                        </Nav.Link>
                    </Nav>
                    {/* // Nav 1 */}

                    {/* Burger */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {/* // Burger */}

                    {/* Nav 2*/}
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {/* Nav item */}
                            <Nav.Item>
                                <Link href="tel:+74872792818">
                                    <a>
                                        <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                                        </svg>
                                        +7-487-279-28-18
                                    </a>
                                </Link>
                            </Nav.Item>
                            {/* // Nav item */}

                            {/* Nav item */}
                            <Nav.Item>
                                    <Link href="/cart">
                                        <a>
                                            <div className="cart">
                                                <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                </svg>
                                                <div className="cart-counter">{cartCounter}</div>
                                            </div>
                                            <span className="d-lg-none">Cart</span>
                                        </a>
                                    </Link>
                            </Nav.Item>
                            {/* // Nav item */}
                        </Nav>
                    </Navbar.Collapse>
                    {/* // Nav 2 */}
                </Container>
            </Navbar>

            <style jsx>{`
                .cart {
                    position: relative;
                }    
                .cart-counter {
                    position: absolute;
                    display: ${cartCounter !== 0 ? 'flex' : 'none'};
                    align-items: center;
                    justify-content: center;
                    bottom: -10px;
                    right: -5px;
                    height: 16px;
                    width: 16px;
                    border-radius: 9999px;
                    background-color: red;
                    color: white;
                    font-size: 14px;
                    line-height: 1em;
                }
            `}</style>
        </>
    )
}