import React from 'react';
import heroImg from "../../assets/rabbit-hero.webp"
import { Link } from 'react-router';
const Hero = () => {
    return (
       <section className='relative'>
  <img
    className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'
    src={heroImg}
    alt="heroimg"
  />
  <div className='absolute inset-0 flex items-center justify-center bg-opacity-70'>
    <div className='text-center text-white'>
      <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>
        vacation <br/>Ready 
      </h1>
      <p className='text-sm tracking-tighter md:text-lg mb-6'>
        Explore our Vacation-ready outfits with fast worldwide shipping
      </p>
      <Link to="#" className="bg-white text-gray-950 px-6 py-2 rounuded-sm text-lg">
      Shop Now
      </Link>
    </div>
  </div>
</section>

    );
}

export default Hero;
