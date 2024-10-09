// import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import './whyneed.css'
// import { Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// // Import Swiper styles
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import Experience from './Experience';

// const SwiperCard = (props) => {
//   let data = props?.data
//   console.log(data, "hhhhh")
 


//   return (

//     <Swiper
//     pagination={{
//         type: 'progressbar',
//       }}
//       navigation={true}
//       modules={[Autoplay, Pagination, Navigation]}
//         loop={true}
//         autoplay={{
//             delay: 5000,
//             disableOnInteraction: true,
//         }}
//         className={'home_slider home_slider1 whyneed1'}
//         slidesPerView={1}
//         breakpoints={{
//             360: {
//                 slidesPerView: 1
//             },
           
//             550: {
//                 slidesPerView: 2
//             },
           
//             690: {
//                 slidesPerView: 2
//             },
//             1000: {
//                 slidesPerView: 3
//             },
//             1200: {
//                 slidesPerView: 3
//             }
//         }}
//         spaceBetween={30}
//     >
    
//       {data?.map(element=>(
//                     <SwiperSlide key={element._id}><Experience data={element} /></SwiperSlide>
//                 ))}
//     </Swiper>
//   )
// }

// export default SwiperCard

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './whyneed.css';
import { Pagination, Navigation, Autoplay } from 'swiper/modules'; // Import all required modules
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Ensure Swiper navigation CSS is imported
import Experience from './Experience';

const SwiperCard = (props) => {
  let data = props?.data;
  console.log(data, "Swiper data");

  return (
    <Swiper
      pagination={{
        type: 'progressbar',
      }}
      navigation={true} // Make sure this is set to true
      modules={[Autoplay, Pagination, Navigation]} // Ensure Navigation module is included
      loop={true}
      autoplay={{
        delay: 1000,
        disableOnInteraction: true,
      }}
      className={'home_slider home_slider1 whyneed1'}
      slidesPerView={1}
      breakpoints={{
        360: {
          slidesPerView: 1,
        },
        550: {
          slidesPerView: 2,
        },
        690: {
          slidesPerView: 2,
        },
        1000: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 3,
        },
      }}
      spaceBetween={30}
    >
      {data?.map((element) => (
        <SwiperSlide key={element._id}>
          <Experience data={element} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCard;
