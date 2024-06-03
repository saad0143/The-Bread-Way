import React, { useState } from 'react';
import Navbar from '../../components/User/Navbar';
import img from '../../Assets/model/donut1.jpg';
import { toast } from 'react-toastify';

const Page2 = ({ selectedChoice, currentPage, onNext, onPrev }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelection = (optionType, option) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [optionType]: option === prevOptions[optionType] ? null : option,
    }));
  };

  const handlePrevClick = () => {
    onPrev();
  };

  const handleNextClick = () => {
    const requiredOptions = availableOptions[selectedChoice];
    const selectedChoicesArray = Object.entries(selectedOptions).map(([key, value]) => ({ [key]: value }));

    if (Object.keys(selectedOptions).length === requiredOptions.length) {
      onNext(selectedChoicesArray);
    } else {
      toast.error('Please fill in all the choices to Continue.');
    }
  };

  // Define the available customization options based on the selected choice from Page1
  const availableOptions = {
    Cake: ["Shape", "Size", "Flavor", "Frosting", "Topping"],
    Cupcake: ["Flavor", "Frosting", "Topping"],
    Donut: ["Flavor", "Frosting", "Topping"],
  };

  // Define specific options for each category
  const optionsMap = {
    Shape: ["Round", "Square", "Heart"],
    Size: ["Small", "Medium", "Large"],
    Flavor: ["Chocolate", "Vanilla", "Strawberry"],
    Frosting: ["Chocolate", "Vanilla", "Strawberry"],
    Topping: ["Sprinkles", "Fruits", "Nuts"],
  };

  // Render the customization options based on the selected choice
  const renderOptions = () => {
    const selectedOptionsKeys = availableOptions[selectedChoice] || [];
    return selectedOptionsKeys.map(optionType => renderOption(optionType, optionsMap[optionType]));
  };

  return (
    <>
     
      <div className='w-full mt-28'>
        <div className='w-full flex justify-center items-center'>
          <div className='w-11/12 flex '>
            <div className='w-[40%] px-20'>
              <img src={img} alt="" className='h-[500px] w-full object-cover mt-10' />
            </div>
            <div className='w-[60%]'>
              <h4 className='text-4xl font-bold flex justify-center items-center mb-8 mt-2'>Customize Your {selectedChoice}</h4>

              <div className='flex items-center justify-center'>
                <div className=' justify-around items-center px-10 w-full'>
                  {renderOptions()}
                </div>
              </div>
              <div className='w-full flex justify-end p-4 mt-10'>
                {currentPage > 1 && (
                  <button
                    onClick={handlePrevClick}
                    className="back-button bg-black text-white font-bold py-2 px-4 rounded w-32 mr-2"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNextClick}
                  className={`next-button bg-blue-500 text-white font-bold py-2 px-4 rounded w-32`}
                >
                  {currentPage === 2 ? 'Next' : 'Proceed to Page 3'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function renderOption(optionType, options) {
    return (
      <div className='items-center' key={optionType}>
        <h4 className='text-lg font-bold mt-4 mb-1'>{optionType}</h4>
        <div className='flex justify-around w-full'>
          {options.map(option => (
            <div
              key={option}
              onClick={() => handleOptionSelection(optionType, option)}
              className={`shadow-md p-2 w-24 hover:scale-105 transform transition-transform duration-300 ease-in-out cursor-pointer ${selectedOptions[optionType] === option ? 'bg-blue-500 text-white' : ''}`}
            >
              <p className={`text-sm flex justify-center mb-2 ${selectedOptions[optionType] === option ? 'text-white' : ''}`}>
                {option}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Page2;
