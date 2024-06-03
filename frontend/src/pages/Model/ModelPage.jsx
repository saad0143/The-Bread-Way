import React, { useState } from 'react';
import Navbar from '../../components/User/Navbar';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4'; // Import Page4

const ModelPage = () => {
  const [selectedChoicePage1, setSelectedChoicePage1] = useState(null);
  const [selectedChoicePage2, setSelectedChoicePage2] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextStepPage1 = (choice) => {
    setSelectedChoicePage1(choice);
    setCurrentPage(currentPage + 1);
  };

  const handleNextStepPage2 = (choice) => {
    setSelectedChoicePage2(choice);
    setCurrentPage(currentPage + 1);
  };

  const handlePrevStep = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextStepPage3 = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Navbar />
      {currentPage === 1 && <Page1 onNext={handleNextStepPage1} />}
      
      {currentPage === 2 && <Page2 selectedChoice={selectedChoicePage1} currentPage={currentPage}
       onNext={handleNextStepPage2} onPrev={handlePrevStep} />}

      {currentPage === 3 && <Page3 selectedChoices={selectedChoicePage2} onPrev={handlePrevStep} onNext={handleNextStepPage3} />} 

      {currentPage === 4 && <Page4 />} {/* Render Page4 when currentPage is 4 */}
    </>
  );
};

export default ModelPage;
