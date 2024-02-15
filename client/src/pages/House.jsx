import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';

export default function House() {
  SwiperCore.use([Navigation]);
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/house/get/${params.houseId}`);
        const data = await res.json();
        console.log('House Data:', data);
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setHouse(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.error('Fetch Error:', error);
        setError(true);
        setLoading(false);
      }
    };

    console.log('House ID:', params.houseId);
    fetchHouse();
  }, [params.houseId]);
  
  console.log('House State:', house);
  console.log('Loading State:', loading);
  console.log('Error State:', error);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {house && !loading && !error && (
        <div>
          <Swiper navigation>
            {house.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-purple-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {house.name} - Rwf{' '}
              {house.offer
                ? house.discountPrice.toLocaleString('en-US')
                : house.price.toLocaleString('en-US')}
              {house.type === 'join' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-700  text-sm'>
              <FaMapMarkerAlt className='text-slate-700' />
              {house.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-purple-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {house.type === 'join' ? 'For join' : 'For Sale'}
              </p>
              {house.offer && (
                <p className='bg-slate-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  Rwf{+house.price - +house.discountPrice} OFF
                </p>
              )}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {house.description}
            </p>
            <ul className='text-slate-700 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {house.bedrooms > 1
                  ? `${house.bedrooms} beds `
                  : `${house.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {house.bathrooms > 1
                  ? `${house.bathrooms} baths `
                  : `${house.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {house.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {house.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && house.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-purple-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact Peer
              </button>
            )}
            {contact && <Contact house={house} />}
          </div>
        </div>
      )}
    </main>
  );
}
