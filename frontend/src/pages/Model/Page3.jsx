import React from 'react';
import Navbar from '../../components/User/Navbar';
import img from '../../Assets/model/img3.jpeg';
import { Link } from 'react-router-dom';

const Page3 = ({ selectedChoices, onNext, onPrev }) => {
  const renderNestedChoices = (choices) => {
    if (!choices || !Array.isArray(choices)) {
      return null; 
    }

    return (
      <div className="flex w-full justify-center mt-10">
        {choices.map((choice, index) => (
          <div key={index} className="flex justify-center items-center mx-2 mb-2">
            {Object.entries(choice).length > 0 && ( 
              Object.entries(choice).map(([key, value]) => (
                value !== null && (
                  <div key={key} className="flex flex-col bg-white rounded-3xl border-2 w-40 justify-center items-center">
                    <div className='px-4 py-3'>
                      <h2 className="text-lg font-medium tracking-tighter text-gray-600 ">
                        {key}
                      </h2>
                      <p className="mt-2 text-sm text-gray-500">{value}</p>
                    </div>
                  </div>
                )
              ))
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className='w-full'>
        <div className='w-full flex justify-center items-center'>
          <div className='w-11/12 flex '>
            <div className='w-full'>
              <h4 className='text-4xl font-bold flex justify-center items-center mb-5 mt-5'>
                Your Customized 3D Model is Ready
              </h4>
              <div className='w-full flex justify-center mb-5'>
                <img src={img} alt="" className='h-[300px] w-[300px] object-cover' />
              </div>

              {renderNestedChoices(selectedChoices)}

              <div className='w-full flex justify-end p-4 mt-5'>
                <button
                  onClick={onPrev}
                  className="back-button bg-black text-white font-bold py-2 px-4 rounded w-32 mr-2"
                >
                  Back
                </button>
               <Link to="/checkout">
               <button
                  onClick={onNext}
                  className="next-button bg-blue-500 text-white font-bold py-2 px-4 rounded w-32"
                >
                  Next
                </button>
               </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page3;
