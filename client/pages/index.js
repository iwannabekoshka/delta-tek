import Header from '../components/Header'
import ProductsCarousel from '../components/ProductsCarousel'
import Section from '../components/Section'
import Video from '../components/Video'

export default function Home() {
  return (
    <>
      <Header />

      <Section title="Our products">
        <ProductsCarousel />
      </Section>

      <Section title="SFH-KP9">
        <Video />
      </Section>
    </>
  )
}
