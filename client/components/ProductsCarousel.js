import 'react-alice-carousel/lib/alice-carousel.css'
import AliceCarousel from 'react-alice-carousel'
import ProductCard from '../components/ProductCard'


const items = [
    <ProductCard id="1" />,
    <ProductCard id="2" />,
    <ProductCard id="3" />,
    <ProductCard id="4" />,
    <ProductCard id="5" />,
]
const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    768: { items: 2 },
    1024: { items: 3 },
}

export default function ProductsCarousel( {addCart} ) {
    return (
        <>
        <div className="wrap">
            <AliceCarousel 
                items={items} 
                responsive={responsive} // quantity of slides depending on resolution
                disableDotsControls={true}
                infinite={true}
                autoPlay={false} 
                autoPlayInterval={2500}
                autoHeight={true}
                addCart={addCart}
            />
        </div>
        
        <style jsx>{`
            
        `}</style>
        </>
    )
}