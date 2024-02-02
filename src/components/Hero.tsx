import { motion } from "framer-motion";
import bg from '../assets/image-1-1.jpeg';
import bg2 from '../assets/GettyImages-9.jpg';
import { NavLink } from "react-router-dom";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-slate-800 text-white bg-center bg-cover bg-blend-overlay bg-fixed bg-black/30" 
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex-grow flex flex-col justify-center items-center max-w-full bg-opacity-40 p-8 text-white">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <div className="text-center mx-auto">
              <motion.h1 className="text-6xl font-semibold" variants={containerVariants}>
                Welcome to Smart Find!
              </motion.h1>
              <motion.p className="font-light text-3xl mt-5" variants={containerVariants}>
                Search and let's get you connected.
              </motion.p>
            </div>
            <motion.div className="flex justify-center mt-10" variants={buttonVariants}>
              <NavLink to={"/MapSearchpage"}>
                <a className="px-9 py-3 rounded-lg text-white bg-blue-600 hover:bg-cyan-400 transition-colors" href="">
                  Get Started
                </a>
              </NavLink>
            </motion.div>
          </motion.div>
        </div>
      </div>

    <motion.section
      className="min-h-screen bg-slate-800 bg-center bg-cover bg-blend-over bg-slate/30 relative overflow-hidden"
      style={{ backgroundImage: `url(${bg2})` }}
    >
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mx-auto"
      >
        <motion.h1 className="text-3xl text-white font-semibold">Service that brings a smile to your face</motion.h1>
      </motion.div>
    </motion.section>
    </>
  );
};

export default Hero;
