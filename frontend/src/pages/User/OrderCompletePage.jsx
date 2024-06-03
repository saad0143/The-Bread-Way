import React, { useEffect } from 'react';
import Lottie from 'react-lottie';
import complete2 from '../../Assets/Animation/order-complete-2.json';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/User/Navbar';

const OrderCompletePage = () => {

    const navigate = useNavigate();
    useEffect(() => {
        // Set a timeout to navigate to "/" after 10 seconds
        const timeoutId = setTimeout(() => {
            navigate("/");
            window.location.reload();
        }, 5000);
        // Cleanup the timeout on component unmount
        return () => clearTimeout(timeoutId);
    }, []);
    return (
        <>
            <Navbar />
            <div className='w-full mt-28 h-full flex justify-center'>
                <div className=''>
                    {/* Render the first Lottie animation */}
                    <Lottie options={{ animationData: complete2 }} height={500} width={500} />
                </div>
            </div>
        </>
    );
}

export default OrderCompletePage;
