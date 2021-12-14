import 'react-alice-carousel/lib/alice-carousel.css'
import AliceCarousel from 'react-alice-carousel'
import ProductCard from '../components/ProductCard'



const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    768: { items: 2 },
    1024: { items: 3 },
}

export default function ProductsCarousel( {addCart} ) {
    const items = [
        <ProductCard id="1" addCart={addCart}/>,
        <ProductCard id="2" addCart={addCart}/>,
        <ProductCard id="3" addCart={addCart}/>,
        <ProductCard id="4" addCart={addCart}/>,
        <ProductCard id="5" addCart={addCart}/>,
    ]

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
            />
        </div>
        
        <style jsx>{`
            
        `}</style>
        </>
    )
}