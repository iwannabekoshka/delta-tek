import ProductCard from "./ProductCard";
import {useEffect} from "react";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from"swiper/react"

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Carousel(props) {
	console.log(props.products)

	return (
		<>
			<Swiper
				modules={[Navigation, Pagination]}
				navigation
				// loop={true}
				allowTouchMove={false}
				breakpoints={{
					320: {
						slidesPerView: 1,
						spaceBetween: 10,
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					992: {
						slidesPerView: 3,
						spaceBetween: 30,
					},
				}}
			>
				{props.products.map(product => {
					return 	<SwiperSlide>
								<ProductCard
									title={product.title}
									text={product.description}
									img={product.image}
									id={product.id}
									price={product.price}
									addCartItem={props.addCartItem}
									inCart={props?.cartItems?.includes(product.id)}
								/>
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