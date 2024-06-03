import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteUserAddress, updatUserAddress } from '../../../../redux/actions/user';
import styles from '../../../../style/style';

const AddressPage = () => {
  const [open, setOpen] = useState(false);

  const [zipCode, setZipCode] = useState();
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user, successMessage, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);

    }
  }, [successMessage]);

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(

          address,
          zipCode,
          addressType,
        )
      );
      setOpen(false);
      setAddress("");
      setZipCode(null);
      setAddressType("");
    }

  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full sm:px-14 sm:h-full mb-20 px-3">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="sm:w-[45%] sm:h-[60vh] w-8/12 bg-white rounded shadow relative sm:overflow-y-scroll ">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address</label>
                    <input
                      type="address"
                      className={`w-full border p-1 rounded-[5px]`}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`w-full border p-1 rounded-[5px]`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-full border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>

                  </div>

                  <div className="w-full items-center flex justify-center pb-2 mt-5">
                    <button
                      className="w-[70%] border p-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"

                    >
                      Submit
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="sm:flex w-full items-center justify-between">
        <h1 className={`${styles.heading} sm:w-full sm:mr-20`}>
          My Addresses
        </h1>
        <div className='w-full sm:flex sm:justify-end justify-center hidden'>
          <button
            className='w-[150px] !bg-[#f63b60] text-white h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer'
            onClick={() => setOpen(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-[60px] rounded-[4px] 
            flex items-center sm:px-3 shadow sm:justify-between justify-center gap-3 p-1
             sm:pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="sm:pl-5 sm:text-lg text-sm font-semibold">{item.addressType}</h5>
            </div>
            <div className="sm:pl-8 flex items-center">
              <h6 className="sm:text-md text-sm">
                {item.address}
              </h6>
            </div>
            <div className="sm:pl-8 flex items-center">
            <h6 className="sm:text-md text-sm">
                {item.city}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-2 sm:pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
      <div className='w-full flex justify-center sm:hidden'>
          <button
            className='w-[150px] !bg-[#f63b60] text-white h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer'
            onClick={() => setOpen(true)}
          >
            Add New
          </button>
        </div>
    </div>
  );
};

export default AddressPage
