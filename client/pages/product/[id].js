import Head from "next/head"
import Layout from "../../layouts/Layout"
import styled from 'styled-components'

export default function Product() {
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <img className="img-fluid w-100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/200px-Cat03.jpg" alt="" />
                    </div>
                    <div className="col">
                        <ul className="list-group">
                            <li className="list-group-item">Cras justo odio</li>
                            <li className="list-group-item">Dapibus ac facilisis in</li>
                            <li className="list-group-item">Morbi leo risus</li>
                            <li className="list-group-item">Porta ac consectetur ac</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis repudiandae iste voluptatem, eius magnam accusamus voluptatum tempore dolore recusandae, porro impedit! Repudiandae exercitationem eos sapiente. Numquam, inventore. Esse iste perspiciatis, nemo quasi sed vitae ex, corrupti magni eius, facere debitis. Beatae aperiam tenetur quisquam ipsam blanditiis reprehenderit magni eius praesentium!</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}