import Layout from "../components/layouts/Layout";
import Section from "../components/layouts/Section";
import Carousel from "../components/Carousel";
import Contacts from "../components/Contacts";
import Partners from "../components/Partners";
import {useState} from "react";

export default function Home(props) {
    return (
        <>
            <Section title="Our products">
                <div className="container">
                    <Carousel addCartItem={props.addCartItem} cartItems={props.cartItems} products={props.products}/>
                </div>
            </Section>
            <Section title="Partners">
                <div className="container">
                    <Partners />
                </div>
            </Section>
            <Section title="Contacts">
                <div className="container">
                    <Contacts/>
                </div>
            </Section>
        </>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3200/goods`)
    const products = await res.json()

    return {
        props: {
            products: products
        }
    }
}