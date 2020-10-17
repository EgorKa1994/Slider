import React, { useState, useRef, useEffect } from 'react';
import {
  SlideImg,
  NavDotItem,
  SlideText,
} from './subComponents/SubComponents';
import './styles/Slider';

export const SliderApp = ({ slides }) => {
  const ref = useRef(); // receiving slide-show block for setting animation
  let touchstartX, touchendX; // variables used for swipes

  const [visibleSlides, setVisibleSlides] = useState([0, 1, 2]); // index list of slides which user see on screen. The basic array of slides is received in prop
  const [choosenSlide, setChoosenSlide] = useState(visibleSlides[1]); // slide index used for scrolling to a selected slide
  const [slideShowHeight, setSlideShowHeight] = useState(
    window.innerWidth / 5.3
  ); // controlling slides height

  // set animation effect using ref
  useEffect(() => {
    ref.current.classList.add('fade');

    setTimeout(() => {
      ref.current.classList.remove('fade');
    }, 500);
  }, [choosenSlide]);

  // listen window width to adapt slides height
  useEffect(() => {
    window.addEventListener('resize', slidesHeight);

    return () => {
      window.removeEventListener('resize', slidesHeight);
    };
  }, []);

  // set the dependence between window width and slides height
  const slidesHeight = () => {
    const heightIndex = [5.3, 3.5, 1.7]; // dependence INDEX between window width and slides height
    if (window.innerWidth > 768) {
      setSlideShowHeight(window.innerWidth / heightIndex[0]);
    } else if (window.innerWidth <= 768 && window.innerWidth > 500) {
      setSlideShowHeight(window.innerWidth / heightIndex[1]);
    } else {
      setSlideShowHeight(window.innerWidth / heightIndex[2]);
    }
  };

  // function which describes slide changing using control buttons
  const changeSlider = (direction) => {
    if (direction == 'next') {
      const lastSlideIndex = visibleSlides[visibleSlides.length - 1];
      const nextSlideIndex = lastSlideIndex + 1;
      if (nextSlideIndex == slides.length) {
        setVisibleSlides([...visibleSlides.slice(1), 0]);
      } else {
        setVisibleSlides([...visibleSlides.slice(1), lastSlideIndex + 1]);
      }
      if (nextSlideIndex == 1) {
        setChoosenSlide(0);
      } else {
        setChoosenSlide(visibleSlides[1] + 1);
      }
    } else if (direction == 'prev') {
      const firstSlideIndex = visibleSlides[0];
      const prevSlideIndex = firstSlideIndex - 1;
      if (prevSlideIndex < 0) {
        setVisibleSlides([
          ...visibleSlides.slice(0, 0),
          slides.length - 1,
          ...visibleSlides.slice(0, 2),
        ]);
      } else {
        setVisibleSlides([
          ...visibleSlides.slice(0, 0),
          firstSlideIndex - 1,
          ...visibleSlides.slice(0, visibleSlides.length - 1),
        ]);
      }
      // change active dot according to choosen slide
      if (prevSlideIndex == slides.length - 2) {
        setChoosenSlide(slides.length - 1);
      } else {
        setChoosenSlide(visibleSlides[1] - 1);
      }
    }
  };

  // function which describes slide changing using dot navigation in the bottom of slider
  const navChangeSlide = (value) => {
    let slidesOnScreen = [];
    if (value == 0) {
      slidesOnScreen = [slides.length - 1, +value, +value + 1];
    } else if (value == slides.length - 1) {
      slidesOnScreen = [+value - 1, +value, 0];
    } else {
      slidesOnScreen = [+value - 1, +value, +value + 1];
    }
    setVisibleSlides(slidesOnScreen);
    setChoosenSlide(value);
  };

  // function which listen touch
  const touchStart = (e) => {
    touchstartX = e.changedTouches[0].screenX;
  };

  // function which listen the end of touching
  const touchEnd = (e) => {
    touchendX = e.changedTouches[0].screenX;
    // if touch movement is less than 20px slide will not be changed
    if (touchstartX - touchendX > 20) {
      changeSlider('next');
    } else if (touchstartX - touchendX < -20) {
      changeSlider('prev');
    }
  };

  return (
    <div className='slideshow-container'>
      <div
        onTouchStart={(e) => {
          touchStart(e);
        }}
        onTouchEnd={(e) => {
          touchEnd(e);
        }}
        ref={ref}
        style={{ height: `${slideShowHeight}px` }}
        className='slide-show'
      >
        {visibleSlides.map((item) => {
          if (slides[item].type == 'pic') {
            return <SlideImg src={slides[item].src} alt={item} key={item} />;
          } else if (slides[item].type == 'text') {
            return (
              <SlideText
                text={slides[item].text}
                title={slides[item].title}
                key={item}
                className={`text text_${slides[item].title}`}
              />
            );
          }
        })}
        <a
          className='prev'
          onClick={() => {
            changeSlider('prev');
          }}
        ></a>
        <a
          className='next'
          onClick={() => {
            changeSlider('next');
          }}
        ></a>
      </div>
      <div className='navigation'>
        {slides.map((item, index) => {
          return (
            <NavDotItem
              className={choosenSlide == index ? 'active' : ''}
              id={index}
              key={index}
              onClick={(value) => navChangeSlide(value)}
            />
          );
        })}
      </div>
    </div>
  );
};
