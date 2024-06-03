import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../Assets/Animation/Animation.json';

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
   
  };

  return (
    <div className='w-full flex items-center justify-center h-screen'>
      <Lottie options={defaultOptions} height={300} width={300}  />
    </div>
  );
};

export default Loader;
