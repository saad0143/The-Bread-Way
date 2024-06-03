import React from 'react';
import image1 from '../../../Assets/Home/image1.jpeg';
import image2 from '../../../Assets/Home/image2.jpeg';
import image3 from '../../../Assets/Home/image3.jpeg';
import image5 from '../../../Assets/Home/image5.jpeg';
import image6 from '../../../Assets/Home/image6.jpeg';

const Hero = () => {
  return (
    <div className=''>
      <div className="flex flex-col sm:flex-row py-5 sm:py-8">
        {/* right side */}
        <div className="flex flex-col justify-center items-center mx-auto sm:ml-28 sm:mt-0 mt-10 ">
          <h1 className="text-4xl sm:text-5xl font-bold uppercase items-center justify-center">The Bread Way</h1>
          <p className="text-sm sm:text-xl p-[2px] text-gray-600 uppercase">
            Baked Fresh, Delivered with Love
          </p>
          
        </div>
        {/* left side */}
        <div className="flex justify-center items-center h-full sm:mt-0 mt-5">
        <div className="grid grid-cols-2 gap-3 sm:h-[370px] sm:w-[550px] h-[280px] w-[450px] sm:p-0 p-4 sm:mr-5">
          <div className="relative overflow-hidden col-span-1 row-span-3">
            <img className="object-cover w-full h-full" src={image1} alt="" />
          </div>
          <div className="relative overflow-hidden col-span-1 row-span-2">
            <img className="object-cover w-full h-full" src={image5} alt="" />
          </div>
          <div className="relative overflow-hidden col-span-1 row-span-1">
            <img className="object-cover w-full h-full" src={image2} alt="" />
          </div>
          <div className="relative overflow-hidden col-span-1 row-span-2">
            <img className="object-cover w-full h-full" src={image3} alt="" />
          </div>
          <div className="relative overflow-hidden col-span-1 row-span-3">
            <img className="object-cover w-full h-full" src={image6} alt="" />
          </div>
        </div>
        </div>

      </div>
    </div>
  )
}

export default Hero
