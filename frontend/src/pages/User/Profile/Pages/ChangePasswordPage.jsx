import axios from 'axios';
import React, { useState } from 'react'
import { server } from '../../../../server';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import styles from '../../../../style/style';

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Password Changed Successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowPassword(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="w-full sm:px-5 px-2 h-full sm:mb-20">
      <h1 className={`text-xl sm:text-3xl bg-black/30 w-full sm:w-auto py-5
       px-10 h-14 text-white font-bold  uppercase flex items-center justify-center`}>
        Change Password
      </h1>
      <div className="w-full mt-5">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          {/* Old Password */}
          <div className="w-full sm:w-2/5 mt-5">
            <label className="block pb-2">Old Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full border p-1 rounded-[5px] mb-4 800px:mb-0`}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span
                className='absolute top-1/3 right-3 transform -translate-y-1/2 cursor-pointer'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </span>
            </div>
          </div>

          {/* New Password */}
          <div className="w-full sm:w-2/5 mt-2">
            <label className="block pb-2">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full border p-1 rounded-[5px]  mb-4 800px:mb-0`}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className='absolute top-1/3 right-3 transform -translate-y-1/2 cursor-pointer'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="w-full sm:w-2/5 mt-2">
            <label className="block pb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full border p-1 rounded-[5px]  mb-4 800px:mb-0`}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className='absolute top-1/3 right-3 transform -translate-y-1/2 cursor-pointer'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </span>
            </div>
            <div className="w-full items-center flex justify-center pb-2 mt-5">
              <button

                className="w-[70%] border p-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
              >
                Change
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage