import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Carousel = () => {
    const items = [
      {
        id: 1,
        title: "Marina Bay Sands",
        description: "This is a short description",
        imageUrl: "singapour.jpg",
      },
      {
        id: 2,
        title: "Marina Bay Sands",
        description: "This is a short description",
        imageUrl: "singapour.jpg",
      },
      {
        id: 3,
        title: "Marina Bay Sands",
        description: "This is a short description",
        imageUrl: "singapour.jpg",
      },
      {
        id: 4,
        title: "Marina Bay Sands",
        description: "This is a short description",
        imageUrl: "singapour.jpg",
      },
      {
        id: 5,
        title: "Marina Bay Sands",
        description: "This is a short description",
        imageUrl: "singapour.jpg",
      },
      {
        id: 6,
        title: "Marina Bay Sands",
        description: "This is a short description",
        imageUrl: "singapour.jpg",
      },
    ];
  
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
        prevArrow: <button className="slick-arrow slick-prev">&#8592;</button>,
        nextArrow: <button className="slick-arrow slick-next">&#8594;</button>,
        beforeChange: (current, next) => {
          // Remove the first item from the array and add a new item to the end
          items.push(items.shift());
        },
      };
    
      return (
        <Slider {...settings}>
          {items.map((item) => (
              <div key={item.id} className="px-3">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                  />
                <div className="p-3">
                  <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      );
    };