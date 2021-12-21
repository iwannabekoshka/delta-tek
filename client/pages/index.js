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
                        <Carousel addCartItem={props.addCartItem}/>
                    </div>
                </Section>
                <Section title="Contacts">
                    <div className="container">
                        <Contacts />
                    </div>
                </Section>
                <Section title="Partners">
                    <div className="container">
                        <Partners />
                    </div>
                </Section>
        </>
    )
}