import axios from "axios";
import { server } from "../../server";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

// load Seller
export const loadseller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller, // Assuming the seller data is available in 'data.seller'
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};



// user update information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch({
          type: "updateUserInfoFailed",
          payload: "Invalid data. Please check your inputs.",
        });
      } else {
        dispatch({
          type: "updateUserInfoFailed",
          payload: error.response.data.message || "Update failed",
        });
      }
    }
  };


  // update user address
export const updatUserAddress =
(address, zipCode, addressType) =>
async (dispatch) => {
  try {
    dispatch({
      type: "updateUserAddressRequest",
    });
    
    const { data } = await axios.put(
      `${server}/user/update-user-addresses`,
      {
        address,
        zipCode,
        addressType,
      },
      { withCredentials: true }
    );

    dispatch({
      type: "updateUserAddressSuccess",
      payload: {
        successMessage: "User address added succesfully!",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "updateUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
try {
  dispatch({
    type: "deleteUserAddressRequest",
  });

  const { data } = await axios.delete(
    `${server}/user/delete-user-address/${id}`,
    { withCredentials: true }
  );

  dispatch({
    type: "deleteUserAddressSuccess",
    payload: {
      successMessage: "User deleted successfully!",
      user: data.user,
    },
  });
} catch (error) {
  dispatch({
    type: "deleteUserAddressFailed",
    payload: error.response.data.message,
  });
}
};

