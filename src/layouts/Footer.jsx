import React from 'react'
import Marquee from 'react-fast-marquee';
import race from '../assets/race.png'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
function Footer() {

  return (
    <div className='mt-20'>
      <div className="overflow-hidden text-sm font-medium border-t border-b mb-1">
        <Marquee
          autoFill
          speed={50}
          // pauseOnHover={true}
          gradient={false}
          direction="left"
          className='cursor-grab'
        >
          <div className='flex items-center space-x-8 mx-4'>
            <img className='w-12 h-12' src={race} alt="" />
            <span>🚚 Free shipping on orders over $50</span>
            <span className=''>•</span>
            <span className=''>🔥 New arrivals just dropped!</span>
            <span className=''>•</span>
            <span className=''>🎁 15% off your first order - NEW15</span>
            <span className=''>•</span>
            <span className=''>💯 100% Satisfaction Guaranteed</span>
            <span className=''>•</span>
            <img className='w-12 h-12' src={race} alt="" />
            <span className=''>•</span>
          </div>
        </Marquee>
      </div>
      <div className='bg-black bg-gradient-to-r from-black via-pink-950 to-black text-white'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between py-4'>
            <div>
              <p className='text-lg font-bold'>© {new Date().getFullYear()} TP-Cambo. All rights reserved.</p>
            </div>
            <div>
              <div className='flex items-center space-x-4'>
                <a href="https://www.facebook.com/tpcambo" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/tpcambo" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a href="https://twitter.com/tpcambo" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer