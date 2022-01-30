import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import Image from 'next/image'

function ProductCarousel(props) {
	const product = props.product

	return (
		<>
			<Swiper
				modules={[Navigation, Pagination]}
				navigation
				allowTouchMove={false}
				slidesPerView={1}
			>
				{product.images.map(image => {
					return  <SwiperSlide key={image}>
						<img src={`/${image}`} alt={product.name} className="w-100" />
					</SwiperSlide>
				})}
			</Swiper>

			<style jsx>{`
				.swiper-wrapper {
					align-items: stretch;
				}
			`}</style>
		</>
	)
}

export default ProductCarousel;