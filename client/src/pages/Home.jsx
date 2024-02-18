import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import HouseItem from '../components/HouseItem';
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import axios from 'axios';

export default function Home() {
  const [offerHouses, setOfferHouses] = useState([]);
  const [joinHouses, setJoinHouses] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferHouses = async () => {
      try {
        const res = await fetch('/api/house/get?offer=true&lim');
        if (!res.ok) {
          throw new Error('Failed to fetch offer houses');
        }
        const data = await res.json();
        setOfferHouses(data);
        
        fetchJoinHouses();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchJoinHouses = async () => {
      try {
        const res = await fetch('api/house/housesall');
        if (!res.ok) {
          throw new Error('Failed to fetch join houses');
        }
        const data = await res.json();
       setJoinHouses(data)
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferHouses();
  }, []);

  return (
    <div>
      <Banner />
      <Swiper navigation>
        {offerHouses &&
          offerHouses.length > 0 &&
          offerHouses.map((house) => (
            <SwiperSlide key={house._id}>
              <div
                style={{
                  background: `url(${house.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 items-center'>
  {joinHouses && joinHouses.length > 0 && (
    <div className='text-center'>
      <div className='my-3'>
        <h2 className='text-2xl font-semibold text-purple-600'>Recent places for Join</h2>
        <Link className='text-sm text-slate-800 hover:underline' to={'/search?type=join'}>Show more places for Join</Link>
      </div>
      <div className='flex flex-wrap justify-center gap-4'>
        {joinHouses.map((house) => (
          <HouseItem house={house} key={house._id} />
        ))}
      </div>
    </div>
  )}
</div>

      <Footer />
    </div>
  )
}