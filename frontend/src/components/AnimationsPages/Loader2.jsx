import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../Assets/Animation/empty_cart.json';

const Loader2= () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
   
  };

  return (
    <div className='w-full flex items-center justify-center sm:mt-0 mt-14' >
      <Lottie options={defaultOptions}  />
    </div>
  );
};

export default Loader2 ;
