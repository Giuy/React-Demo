import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { PropertyDto } from "../../pages/api/general-client";
import PropertyCard from "./property-card";

type SliderPropertiesProps = {
  properties: PropertyDto[];
};

const SliderProperties: React.FC<SliderPropertiesProps> = (
  props: SliderPropertiesProps
) => {
  const { t } = useTranslation();
  const [slidesPerView, setSlidesPerView] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1410) {
        setSlidesPerView(3);
      } else if (window.innerWidth < 1410 && window.innerWidth > 768) {
        setSlidesPerView(2);
      } else if (window.innerWidth < 768) {
        setSlidesPerView(1);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
  });

  return (
    <div className="sliders-properties">
      <Swiper
        spaceBetween={15}
        slidesPerView={slidesPerView}
        direction="horizontal"
      >
        {props.properties &&
          props.properties.map((item, index) => (
            <SwiperSlide key={index}>
              <PropertyCard key={item.id} property={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default SliderProperties;
