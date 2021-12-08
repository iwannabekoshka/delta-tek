import 'react-alice-carousel/lib/alice-carousel.css'
import AliceCarousel from 'react-alice-carousel'
import ProductCard from '../components/ProductCard'


const items = [
    <ProductCard />,
    <ProductCard />,
    <ProductCard />,
    <ProductCard />,
    <ProductCard />,
]
const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
}

export default function ProductsCarousel() {
    return (
        <>
        <div className="wrap">
            <AliceCarousel 
            items={items} 
            responsive={responsive} // quantity of slides depending on resolution
            disableDotsControls={true}
            infinite={true}
            autoPlay={true} 
            autoPlayInterval={2500}
            />
        </div>
        
        <style jsx>{`
          .wrap {
            //height: 20vh;
          }  
        `}</style>
        </>
    )
}