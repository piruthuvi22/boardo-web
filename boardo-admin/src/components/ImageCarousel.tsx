import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Pagination, Navigation, FreeMode, Thumbs } from "swiper/modules";
import { useState } from "react";

export default function ImageCarousel({
  imagesList,
}: {
  imagesList?: { url: string; name: string; fileRef: string }[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        lazy={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {imagesList?.map((image, index) => (
          <SwiperSlide key={index + image.name}>
            <img src={image.url} loading="lazy" />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <Swiper
        // onSwiper={setThumbsSwiper}
        // onChange={(swiper) => setThumbsSwiper(swiper.)}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {imagesList?.map((image, index) => (
          <SwiperSlide key={index + image.name}>
            <img src={image.url} loading="lazy" />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </SwiperSlide>
        ))}
      </Swiper> */}
    </>
  );
}

/**
 * 
 * {imagesList?.map((image, index) => (
        <Box key={index + image.name} sx={{}} >
          <img src={image.url} style={{ 
            objectFit: "cover", 
            width: "100%", 
            height: "500px", 
            borderRadius: "10px"
           }} />
          <p className="legend">{image.name}</p>
        </Box>
      ))}

 */
