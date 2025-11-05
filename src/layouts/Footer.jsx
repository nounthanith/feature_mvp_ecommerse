import React from 'react'
import Marquee from 'react-fast-marquee';
import race from '../assets/race.png'
function Footer() {
    
  return (
    <div className='mt-20'>
        <div className="overflow-hidden text-sm font-medium border-t border-b">
                <Marquee
                    autoFill
                    speed={60}
                    // pauseOnHover={true}
                    gradient={false}
                    direction="left"
                    className='cursor-grab'
                >
                    <div className='flex items-center space-x-8 mx-4'>
                        <span className='hidden lg:inline'>•</span>
                        <img className='w-12 h-12' src={race} alt="" />
                        <span>🚚 Free shipping on orders over $50</span>
                        <span className='hidden sm:inline'>•</span>
                        <span className='hidden sm:inline'>🔥 New arrivals just dropped!</span>
                        <span className='hidden md:inline'>•</span>
                        <span className='hidden md:inline'>🎁 15% off your first order - NEW15</span>
                        <span className='hidden lg:inline'>•</span>
                        <span className='hidden lg:inline'>💯 100% Satisfaction Guaranteed</span>
                        <span className='hidden lg:inline'>•</span>
                        <img className='w-12 h-12' src={race} alt="" />
                        
                    </div>
                </Marquee>
            </div>
            {/* <div className='bg-gray-900 h-60 text-white'>
                
            </div> */}
    </div>
  )
}

export default Footer