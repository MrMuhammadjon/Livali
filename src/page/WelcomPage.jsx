import React, { useEffect } from 'react'
import { useAppContext } from '../Context/AppContext'
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WelcomPage = () => {


    useEffect(() => {
      AOS.init({
        once: true,     
      });
    }, []);

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4"  data-aos="fade-up dura" data-aos-duration="1000">Welcome to Livali</h1>
        <p className="text-lg mb-6"  data-aos="fade-up"  data-aos-duration="1300">Your one-stop shop for all your needs!</p>
        <button
          className="px-6 py-3 bg-black text-white rounded-full hover:bg-white hover:text-black border-2 cursor-pointer"
          onClick={() => {
            localStorage.setItem('hasVisited', 'true')
            window.location.href = '/'
          }}  data-aos="fade-up"  data-aos-duration="1600"
        >
          Start Shopping
        </button>
      </div>
    )
  }

  export default WelcomPage
