import Layout from "../layouts/Layout";
import Head from "next/head";
import Slider from "react-slick";
import styled from "styled-components";
import Section from "../layouts/Section";
import Link from "next/link";

const CardWrapper = styled.div`
  padding: 20px;
`;
const SliderWrapper = styled(Slider)`
  margin: 0 -20px;
`;
const VideoWrapper = styled.div`
    position: relative;
    height: 600px;
`
const IFrameWrapper= styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

const Index = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <Layout>
        {/* Carousel */}
        <Section>
          <div className="container">
            <h2>Products</h2>

            <SliderWrapper {...settings}>
              <CardWrapper className="wrap-card">
                <div class="card">
                  <img
                    class="card-img-top"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/200px-Cat03.jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <Link href="/products/1">
                        <a class="btn btn-primary">
                        Go somewhere
                        </a>
                    </Link>
                  </div>
                </div>
              </CardWrapper>
              <CardWrapper className="wrap-card">
                <div class="card">
                  <img
                    class="card-img-top"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/200px-Cat03.jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </CardWrapper>
              <CardWrapper className="wrap-card">
                <div class="card">
                  <img
                    class="card-img-top"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/200px-Cat03.jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </CardWrapper>
              <CardWrapper className="wrap-card">
                <div class="card">
                  <img
                    class="card-img-top"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/200px-Cat03.jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </CardWrapper>
              <CardWrapper className="wrap-card">
                <div class="card">
                  <img
                    class="card-img-top"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/200px-Cat03.jpg"
                    alt="Card image cap"
                  />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </CardWrapper>
            </SliderWrapper>
          </div>
        </Section>

        {/* Video */}
        <Section>
            <VideoWrapper className="container">
                <IFrameWrapper src="https://www.youtube.com/embed/1guKRaLzlok" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></IFrameWrapper>
            </VideoWrapper>
        </Section>

        {/* Contacts */}
        <Section classes="bg-dark text-light">
            <div className="container">
                <h2>Contacts</h2>

                <div className="row">
                    <div className="col">
                        <ul className="list-group list-group-flush">
                            <li class="list-group-item bg-dark text-light">
                                <div className="row">
                                    <div className="col-4">E-mail:</div>
                                    <div className="col">deltatek@gmail.com</div>
                                </div>
                            </li>
                            <li class="list-group-item bg-dark text-light">
                                <div className="row">
                                    <div className="col-4">Addres:</div>
                                    <div className="col">deltatek@gmail.com</div>
                                </div>
                            </li>
                            <li class="list-group-item bg-dark text-light">
                                <div className="row">
                                    <div className="col-4">Whatsapp:</div>
                                    <div className="col">8-800-555-35-35</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A01e72b9c5a60031b358bf373c4df10aadf3a24b71d16c0849cd89a5929039d27&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>
                    </div>
                </div>
            </div>
        </Section>

        {/* Partners */}
        <Section classes="bg-primary text-light">
            <div className="container">
                <h2>Products</h2>

                <div className="row flex-wrap g-4">
                    <div className="col-3">
                        <img src="http://via.placeholder.com/300" alt="" className="img-fluid" />
                    </div>
                    <div className="col-3">
                        <img src="http://via.placeholder.com/300" alt="" className="img-fluid" />
                    </div>
                    <div className="col-3">
                        <img src="http://via.placeholder.com/300" alt="" className="img-fluid" />
                    </div>
                    <div className="col-3">
                        <img src="http://via.placeholder.com/300" alt="" className="img-fluid" />
                    </div>
                    <div className="col-3">
                        <img src="http://via.placeholder.com/300" alt="" className="img-fluid" />
                    </div>
                    <div className="col-3">
                        <img src="http://via.placeholder.com/300" alt="" className="img-fluid" />
                    </div>
                    <div className="col-3">
                        <img src="http://via.placeholder.com/300" alt="" className="img-fluid" />
                    </div>
                    <div className="col-3">
                        <img src="http://via.placeholder.com/300" alt="" className="img-fluid" />
                    </div>
                </div>
            </div>
        </Section>
      </Layout>
    </>
  );
};

export default Index;
