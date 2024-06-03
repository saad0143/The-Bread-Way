import React, { useState } from 'react';
import Navbar from '../../components/User/Navbar';
import cake1 from '../../Assets/model/cake1.jpeg';
import donut1 from '../../Assets/model/donut1.jpeg';
import cupcake1 from '../../Assets/model/cupcake1.jpeg';
import img from '../../Assets/model/img3.jpeg';

const Page1 = ({ onNext }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoiceSelection = (choice) => {
    setSelectedChoice(choice === selectedChoice ? null : choice);
  };

  const handleNextClick = () => {
    onNext(selectedChoice);
  };
  

  console.log(selectedChoice)
  
  return (
    <>
     
        <div className='w-full flex justify-center items-center mt-32'>
          <div className='h-auto w-11/12 flex '>
            <div className='w-[40%] px-10'>
              <img src={img} alt="" className='h-[500px]  w-full object-cover' />
            </div>
            <div className='w-[60%]'>
              <h4 className='text-4xl font-bold flex justify-center items-center'>Choose Item to Customize Your 3D Model</h4>

              <div className='flex items-center justify-center'>
                <div className='flex justify-around items-center px-5 pt-10 pb-10 w-full'>

                  <div
                    onClick={() => handleChoiceSelection("Cake")}
                    className={`shadow-md p-3 hover:scale-105 transform transition-transform duration-300 ease-in-out cursor-pointer ${selectedChoice === "Cake" ? 'bg-blue-500' : ''
                      }`}
                  >
                    <img src={cake1} alt="" className='h-40 w-52 object-cover' />
                    <h4 className={`text-lg font-bold mt-2 flex justify-center ${selectedChoice === "Cake" ? 'text-white' : ''}`}>
                      Cake
                    </h4>
                  </div>

                  <div
                    onClick={() => handleChoiceSelection("Donut")}
                    className={`shadow-md p-3 hover:scale-105 transform transition-transform duration-300 ease-in-out cursor-pointer ${selectedChoice === "Donut" ? 'bg-blue-500' : ''
                      }`}
                  >
                    <img src={donut1} alt="" className='h-40 w-52 object-cover' />
                    <h4 className={`text-lg font-bold mt-2 flex justify-center ${selectedChoice === "Donut" ? 'text-white' : ''}`}>
                      Donut
                    </h4>
                  </div>

                  <div
                    onClick={() => handleChoiceSelection("Cupcake")}
                    className={`shadow-md p-3 hover:scale-105 transform transition-transform duration-300 ease-in-out cursor-pointer ${selectedChoice === "Cupcake" ? 'bg-blue-500' : ''
                      }`}
                  >
                    <img src={cupcake1} alt="" className='h-40 w-52 object-cover' />
                    <h4 className={`text-lg font-bold mt-2 flex justify-center ${selectedChoice === "Cupcake" ? 'text-white' : ''}`}>
                      Cupcake
                    </h4>
                  </div>

                </div>
              </div>
              <div className='w-full flex justify-end p-4 mt-10'>
                <button
                  onClick={handleNextClick}
                  className={`next-button bg-blue-500 text-white font-bold py-2 px-4 rounded w-32 ${selectedChoice ? '' : 'opacity-50 cursor-not-allowed'}`}
                  disabled={!selectedChoice}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
   
    </>
  );
};

export default Page1;
