import React, { useState, useRef, useEffect } from 'react'
import { TweenLite, Power3 } from 'gsap'
import './App.scss';

import image1 from './assets/image1.jpg'
import image2 from './assets/image2.jpg'
import image3 from './assets/image3.jpg'
import leftArrow from './assets/left-arrow.svg'
import rightArrow from './assets/right-arrow.svg'
import "reset-css"

const testimonials = [
  {
    name: "Chris Coffee",
    title: "Expert Mid-Century Furniture Sitter",
    image: image1,
    quote: "A couple friends and I decided to meet for coffee the other day. Using MeetInTheMiddle we were able to find a great location that was easy for all three of us to get to. Thanks, MeetInTheMiddle!"
  },
  {
    name: "Rachel Rath",
    title: "Resident Secret Goth",
    image: image2,
    quote: "I wanted to find a park that my other two witch friends and I could meet at to cast our spells. Thankfully, MeetInTheMiddle handled all of the stress and we were channeling the undead in no time!"
  },
  {
    name: "Tina Belcher",
    title: "Waitress at Bob's Burgers",
    image: image3,
    quote: "Having been apart for all of Covid, I missed my friends greatly. After using MeetInTheMiddle to find a safe outdoor dining restaurant, we were able to catch up and share all we've been doing. MeetInTheMiddle is the best!"
  }
]

function App() {
  let imageList = useRef(null)
  let testimonialList = useRef(null)
  const imageWidth = 340
  
  const [state, setState] = useState({
    isActive1: true,
    isActive2: false,
    isActive3: false
  })

  useEffect(() => {
    TweenLite.to(testimonialList.children[0], 0, {
      opacity: 1
    })
  }, [])


  const slideImageLeft = (index, duration, multiplied = 1) => {
    TweenLite.to(imageList.children[index], duration, {
      x: -imageWidth * multiplied,
      ease: Power3.easeOut
    })
  }
  
  const slideImageRight = (index, duration, multiplied = 1) => {
    TweenLite.to(imageList.children[index], duration, {
      x: imageWidth * multiplied,
      ease: Power3.easeOut
    });
  };

  const scaleImage = (index, duration) => {
    TweenLite.from(imageList.children[index], duration, {
      scale: 1.2,
      ease: Power3.easeOut
    })
  }

  const fadeTextOut = (index, duration) => {
    TweenLite.to(testimonialList.children[index], duration, {
      opacity: 0
    })
  }

  const fadeTextIn = (index, duration) => {
    TweenLite.to(testimonialList.children[index], duration, {
      opacity: 1,
      delay: 1
    })
  }

  const nextSlide = () => {
    if (imageList.children[0].classList.contains("active")) {
      setState({ isActive1: false, isActive2: true });
      slideImageLeft(0, 1);
      slideImageLeft(1, 1);
      scaleImage(1, 1);
      slideImageLeft(2, 1);
      slideImageLeft(2, 0);
      fadeTextOut(0, 1);
      fadeTextIn(1, 1);
    } else if (imageList.children[1].classList.contains("active")) {
      setState({ isActive2: false, isActive3: true });
      slideImageRight(0, 1);
      slideImageLeft(1, 1, 2);
      slideImageLeft(2, 1, 2);
      scaleImage(2, 1);
      fadeTextOut(1, 1);
      fadeTextIn(2, 1);
    } else if (imageList.children[2].classList.contains("active")) {
      setState({ isActive1: true, isActive3: false });
      slideImageLeft(2, 1, 3);
      slideImageLeft(0, 1, 0);
      slideImageLeft(1, 0, 0);
      scaleImage(0, 1);
      fadeTextOut(2, 1);
      fadeTextIn(0, 1);
    }
  };

  const prevSlide = () => {

    if (imageList.children[0].classList.contains("active")) {
      setState({ isActive1: false, isActive3: true });
      //Image transition
      slideImageLeft(2, 0, 3);
      slideImageLeft(2, 1, 2);
      scaleImage(2, 1);
      slideImageRight(0, 1);
      slideImageRight(1, 1);
      //content transtion
      fadeTextOut(0, 1);
      fadeTextIn(2, 1);
    } else if (imageList.children[1].classList.contains("active")) {
      setState({ isActive2: false, isActive1: true });
      //Image transition
      slideImageLeft(0, 0);
      slideImageRight(0, 1, 0);
      slideImageRight(1, 1, 0);
      slideImageRight(2, 1, 2);
      scaleImage(0, 1);
      //content transtion
      fadeTextOut(1, 1);
      fadeTextIn(0, 1);
    } else if (imageList.children[2].classList.contains("active")) {
      setState({ isActive2: true, isActive3: false });
      slideImageLeft(2, 1);
      slideImageLeft(1, 0, 2);
      slideImageLeft(1, 1);
      scaleImage(1, 1);
      //content transtion
      fadeTextOut(2, 1);
      fadeTextIn(1, 1);
    }
  }
    
    return (
    <div className="testimonial-section">
    <div className="testimonial-container">
      <div className="arrows left" onClick={prevSlide}>
        <span>
          <img src={leftArrow} alt="left arrow" />
        </span>
      </div>
      <div className="inner">
        <div className="t-image">
          <ul ref={el => (imageList = el)}>
            <li className={state.isActive1 ? "active" : ""}>
              <img src={testimonials[0].image} alt={testimonials[0].name} />
            </li>
            <li className={state.isActive2 ? "active" : ""}>
              <img src={testimonials[1].image} alt={testimonials[1].name} />
            </li>
            <li className={state.isActive3 ? "active" : ""}>
              <img src={testimonials[2].image} alt={testimonials[2].name} />
            </li>
          </ul>
        </div>
        <div className="t-content">
          <ul ref={el => (testimonialList = el)}>
            <li className={state.isActive1 ? "active" : ""}>
              <div className="content-inner">
                <p className="quote">{testimonials[0].quote}</p>
                <h3 className="name">{testimonials[0].name}</h3>
                <h4 className="title">{testimonials[0].title}</h4>
              </div>
            </li>
            <li className={state.isActive2 ? "active" : ""}>
              <div className="content-inner">
                <p className="quote">{testimonials[1].quote}</p>
                <h3 className="name">{testimonials[1].name}</h3>
                <h4 className="title">{testimonials[1].title}</h4>
              </div>
            </li>
            <li className={state.isActive3 ? "active" : ""}>
              <div className="content-inner">
                <p className="quote">{testimonials[2].quote}</p>
                <h3 className="name">{testimonials[2].name}</h3>
                <h4 className="title">{testimonials[2].title}</h4>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="arrows right" onClick={nextSlide}>
        <img src={rightArrow} alt="right arrow" />
      </div>
    </div>
  </div>
  );
}

export default App;
