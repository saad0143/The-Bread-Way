import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../server';

const Activation = () => {
  const { token } = useParams(); // Destructure 'token' from 'useParams'
  const [error, setError] = useState(false);

  useEffect(() => {
    if (token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/shop/activation`, {
            activation_token: token, // Use the 'token' from 'useParams'
          });
          console.log(res.data.message);
        } catch (error) {
          console.log(error.response.data.message);
          setError(true); // Update 'error' based on the request result
        }
      };
      activationEmail();
    }
  }, [token]);

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="rounded-lg p-6 text-center">
        {error ? (
          <p className="text-red-500 font-bold text-2xl">Your token is expired!</p>
        ) : (
          <p className="text-green-500 font-bold text-2xl">Your account has been created successfully!</p>
        )}
      </div>
    </div>
  );
}

export default Activation;
