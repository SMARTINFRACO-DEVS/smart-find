// import React from 'react'
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"

const Homepage = () => {
  return (
    <div>
        <Navbar/>
          <div className="flex flex-1 max-w-max bg-[#0c4a6e]">
            <div>
              <motion.div><h1>Home is where theconnection is.</h1></motion.div>
                <div>
                  <p> Get 10GB data bonus when you buy today.</p>
                </div>
                <div>
                  <p> Let's get you connected</p>
                </div>

                <div></div>
            </div>

          <div></div>
        </div>
    </div>
  )
}

export default Homepage