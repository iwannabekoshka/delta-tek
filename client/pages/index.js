import Header from '../components/Header'
import ProductsCarousel from '../components/ProductsCarousel'
import Section from '../components/Section'
import Video from '../components/Video'
import Contacts from '../components/Contacts'
import Layout from '../layouts/Layout'
import { useState } from 'react'

export default function Home() {
  const [cartCounter, setCartCounter] = useState(0)

  const addCart = () => {
    setCartCounter(cartCounter+1)
  }

  return (
    <Layout cartCounter={cartCounter}>
      <Section title="Our products">
        <ProductsCarousel addCart={addCart} />
      </Section>

      <Section title="SFH-KP9">
        <Video />
      </Section>

      <Section title="Contacts">
        <Contacts />
      </Section>
    </Layout>
  )
}
