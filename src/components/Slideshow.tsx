import { useEffect, useState } from "react";

function Slideshow(): JSX.Element {
  const images = [
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1572357176061-7c96fd2af22f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
    "https://images.unsplash.com/photo-1540914124281-342587941389?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=384&q=80",
  ];

  const [slideIndex, setSlideIndex] = useState<number>(0);

  const carousel = () => {
    if (slideIndex < 3) {
      setSlideIndex(slideIndex + 1);
    } else {
      setSlideIndex(0);
    }
  };
  useEffect(() => {
    setTimeout(carousel, 3000);
  });

  return (
    <img
      id="slideshow-img"
      src={images[slideIndex]}
      alt="Our delicious food!"
    />
  );
}

export default Slideshow;
