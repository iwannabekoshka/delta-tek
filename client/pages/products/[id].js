import Layout from "../../layouts/Layout";
import Section from "../../components/Section";


export default function Product() {
    return (
        <Layout>
            <Section>
                <div className="container">
                    <h1>Product</h1>

                    <div className="row">
                        <div className="col">
                            <img src="http://via.placeholder.com/300" alt="" className="img-fluid" />
                        </div>
                        <div className="col">
                            <ul className="list-group list-group-flush">
                                <li class="list-group-item">
                                    <div className="row">
                                        <div className="col-4">E-mail:</div>
                                        <div className="col">deltatek@gmail.com</div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div className="row">
                                        <div className="col-4">Addres:</div>
                                        <div className="col">deltatek@gmail.com</div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div className="row">
                                        <div className="col-4">Whatsapp:</div>
                                        <div className="col">8-800-555-35-35</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>
        </Layout>
    )
}