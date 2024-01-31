// import React from 'react'
 import logo from  '../assets/cropped-Smart-Infraco-Logo-Transparent-white.png'

const Navbar = () => {
  return (
    <div className=' w-vw bg-sky-900 py-5 fixed-top shadow-md flex '>
        <img  className= ' h-10 w-25 ml-4' src={logo} />

    </div>
  )
}

export default Navbar