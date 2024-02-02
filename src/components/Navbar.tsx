// import React from 'react'
 import { FaCartShopping } from 'react-icons/fa6'
import logo from  '../assets/cropped-Smart-Infraco-Logo-Transparent-white.png'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (   
      <div className="flex items-center h-20 shadow-md bg-[#041428]">
            <div className="mx-auto relative px-5 max-w-screen-xl w-full flex items-center justify-end">
              <div className="text-4xl font-light uppercase absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                <img  className= ' h-10 w-25 ml-4' src={logo} />
              </div>

              <div className="flex gap-5">
                <NavLink to={'/OrderPage'}>       
                  <div className='flex items-center flex-col'>
                    <FaCartShopping color='white' size={30} />
                    <a className=' text-white'>Order</a>
                  </div>
                </NavLink>
              </div>
          </div>
      </div>
  )
}

export default Navbar