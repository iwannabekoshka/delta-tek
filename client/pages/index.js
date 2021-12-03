import Layout from "../layouts/Layout"
import Head from 'next/head'
import Slider from "react-slick"
import styled from 'styled-components'
import Card from "../components/Card"

const SliderWrapper = styled(Slider)`
    margin: 0 -20px;
`

const Index = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpedd: 3000
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
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </SliderWrapper>
                </div>
            </Layout>
        </>
    );
};

export default Index;
