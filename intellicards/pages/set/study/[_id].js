import Center from "@/components/Center"
import Header from "@/components/Header"
import styled from "styled-components"
import { useState, useEffect } from "react";
import {cardSetsData, cardsData} from "@/components/data"
// import Navigation from "@/components/Navigation";
import { CardSet } from "@/models/CardSet";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';


export default function StudyPage({_id, cardSet}){
    const set = cardSet;
    const [cards, setCards] = useState([]);
    useEffect(() => {
      if (set) {
        setCards(cardSet.cards);
      }
    }, [set._id]);

    return(
        <Center>
            <Header />
            {/* <Navigation page={set[0].name} /> */}
              <Swiper 
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              pagination={{ el: '.swiper-pagination', clickable: true }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="swiper_container">
                <SwiperSlide>
                <Card>erg</Card>

                </SwiperSlide>
                <SwiperSlide>
                <Card>dsvds</Card>

                </SwiperSlide>

                <SliderControler className="slider-controler">
          <SwiperButtonPrev className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </SwiperButtonPrev>
          <SwiperButtonNext className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </SwiperButtonNext>
          <SwiperPagination className="swiper-pagination"></SwiperPagination>
        </SliderControler>


              </Swiper>



        </Center>

       
    )
}

export async function getServerSideProps(context) {
    const { _id } = context.query;
    const cardSet = await CardSet.findById(_id).populate('cards');

    return {
      props: {
        _id: JSON.parse(JSON.stringify(_id)),
        cardSet: JSON.parse(JSON.stringify(cardSet)),
      },
    };
  }
const Wrapper = styled.div`
  width: 1000px;
  height: 619px;
  background: #F3F3F3;
  margin-top: 10px;
  display: flex;

`



const Card = styled.div`
width: 700px;
height: 400px;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const MainCard = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 width: 100%;

`