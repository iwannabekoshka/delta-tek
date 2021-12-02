import Layout from "../layouts/Layout"
import Head from 'next/head'
import Slider from "react-slick"
import styled from 'styled-components'

const CardWrapper = styled.div`
    padding: 20px
`
const SliderWrapper = styled(Slider)`
    margin: 0 -20px;
`

const Index = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    }


    return (
        <>
            <Head>
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <Layout>
                <div className="container">
                    <SliderWrapper {...settings}>
                        <CardWrapper className="wrap-card">
                            <div class="card">
                                <img class="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/200px-Cat03.jpg" alt="Card image cap" />
                                <div class ="card-body">
                                <h5 class ="card-title">Card title</h5>
                                <p class ="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class ="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </CardWrapper>
                        <CardWrapper className="wrap-card">
                            <div class="card">
                                <img class="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/200px-Cat03.jpg" alt="Card image cap" />
                                <div class ="card-body">
                                <h5 class ="card-title">Card title</h5>
                                <p class ="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class ="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </CardWrapper>
                        <CardWrapper className="wrap-card">
                            <div class="card">
                                <img class="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/200px-Cat03.jpg" alt="Card image cap" />
                                <div class ="card-body">
                                <h5 class ="card-title">Card title</h5>
                                <p class ="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class ="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </CardWrapper>
                        <CardWrapper className="wrap-card">
                            <div class="card">
                                <img class="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/200px-Cat03.jpg" alt="Card image cap" />
                                <div class ="card-body">
                                <h5 class ="card-title">Card title</h5>
                                <p class ="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class ="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </CardWrapper>
                        <CardWrapper className="wrap-card">
                            <div class="card">
                                <img class="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/200px-Cat03.jpg" alt="Card image cap" />
                                <div class ="card-body">
                                <h5 class ="card-title">Card title</h5>
                                <p class ="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class ="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </CardWrapper>
                    </SliderWrapper>
                </div>

            </Layout>
        </>
    );
};

export default Index;
