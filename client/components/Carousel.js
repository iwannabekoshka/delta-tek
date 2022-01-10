import ProductCard from "./ProductCard";
import {useEffect} from "react";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from"swiper/react"

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Carousel(props) {
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
					return  <SwiperSlide key={product._id}>
								<ProductCard
									title={product.name}
									text={product.description}
									img="/img/flashhider.png"
									price={product.price}
									id={product._id}
									addCartItem={props.addCartItem}
									inCart={props.cartItems.filter(item => item.id === product._id).length>0}
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