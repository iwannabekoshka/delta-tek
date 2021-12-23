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
				<SwiperSlide>
					<ProductCard
						title="Title 1"
						text="Some text for space 1"
						img="/img/flashhider.png"
						id={1}
						addCartItem={props.addCartItem}
						inCart={props.cartItems.includes(1)}
						price='100$'
					/>
				</SwiperSlide>
				<SwiperSlide>
					<ProductCard
						title="Title 2"
						text="Some text for space 2 Some text for space 2 Some text for space 2 Some text for space 2 "
						img="/img/flashhider2.png"
						id={2}
						addCartItem={props.addCartItem}
						inCart={props.cartItems.includes(2)}
						price='200$'
					/>
				</SwiperSlide>
				<SwiperSlide>
					<ProductCard
						title="Title 3"
						text=""
						img="/img/flashhider3.png"
						id={3}
						addCartItem={props.addCartItem}
						inCart={props.cartItems.includes(3)}
						price='300$'
					/>
				</SwiperSlide>
				<SwiperSlide>
					<ProductCard
						title="Title 4"
						text="4"
						id={4}
						addCartItem={props.addCartItem}
						inCart={props.cartItems.includes(4)}
						price='400$'
					/>
				</SwiperSlide>
			</Swiper>

			<style jsx>{`
				.swiper-wrapper {
					align-items: stretch;
				}
			`}</style>
		</>
	)
}