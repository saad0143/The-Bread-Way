const express = require("express");
const router = express.Router();
const User = require('../model/user');
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require('fs');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { upload } = require("../multer");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require('../utils/jwtToken');
const { isAuthenticated } = require("../middleware/Auth");
const path = require("path");
const Shop = require("../model/Shop");
const generateResetToken = require("../utils/restToken");

const bcrypt = require('bcrypt');



router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      // A user with the same email already exists
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;

      // Remove the uploaded file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          return next(new ErrorHandler("Error deleting file", 500));
        }

        // Return an error response
        return next(new ErrorHandler("User Already Exists", 400));
      });

      // Do not proceed further in this block
      return;
    }

    const fileUrl = req.file.filename;

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    // Create a new user
    const newUser = await User.create(user);

    const activationToken = createActivationToken(newUser);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: newUser.email,
        subject: "Activate your Account",
        message: `
          Dear ${user.name},
          We are thrilled to welcome you to The Bready Way!
          To start your journey, please click on the link below to activate your account:   

          ${activationUrl}

          If you did not request this activation, you can safely ignore this email.
          Thank you for choosing us. If you have any questions or need assistance, feel free to contact our support team at support@thebreadyway.com.
          Best regards,
          The Bready Way Team
          `
      });

      res.status(201).json({
        success: true,
        message: `Please check your email to activate your account`
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

  } catch (err) {
    next(err); // Pass any errors to the error handler middleware
  }
});

// Create Activation Token
const createActivationToken = (user) => {
  return jwt.sign(user.toObject(), process.env.ACTIVATION_SECRET, {
    expiresIn: "5m"
  });
}

router.post("/activation", catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    // Verify the activation token
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    // Check if the user already exists based on the email
    const user = await User.findOne({ email: newUser.email });

    if (!user) {
      return next(new ErrorHandler("User does not exist", 400));
    }

    // Activate the user
    user.active = true;
    await user.save();

    // Send the token and respond
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

// Login User
router.post("/login-user", catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide both email and password.", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User doesn't exist.", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid email or password.", 400));
    }

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

//load user
router.get("/getuser", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})
);

//logout user
router.get("/logout", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,

    });
    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})
);

//update user information 
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// update user avatar
router.put(
  "/update-avatar",
  isAuthenticated, upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      let existsUser = await User.findById(req.user.id);

      //const existAvatarPath = `uploads/${existsUser.avatar}`
      //fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);
      const user = await User.findByIdAndUpdate(req.user.id, { avatar: fileUrl });


      res.status(200).json({
        success: true,
        user: existsUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// update user addresses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }

      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password doesn't matched with each other!", 400)
        );
      }
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// GET user info by ID
router.get("/user-info/:id", catchAsyncErrors(async (req, res, next) => {
  try {
    const userInfo = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      user: userInfo,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

//allshops
router.get("/all-shops", catchAsyncErrors(async (req, res, next) => {
  try {
    const shops = await Shop.find();
    res.status(200).json({
      success: true,
      count: shops.length,
      data: shops,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

router.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found with this email" });
    }
    
    const resetToken = generateResetToken(email); // Generate the reset token
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`; // Assuming a frontend route for resetting password
    await sendMail({
      email,
      subject: "Password Reset",
      message: `
        Dear User,
        You have requested to reset your password. Please click the link below to reset your password:

        ${resetUrl}

        If you did not request a password reset, you can safely ignore this email.
        
        Regards,
        YourApp Team
      `
    });
    res.status(200).json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    next(error);
  }
});

//reset-password
router.post("/reset-password", async (req, res, next) => {
  try {
    const { email, token, newPassword } = req.body;

    // Verify the reset token
    jwt.verify(token, process.env.RESET_TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        // Handle token verification errors
        if (err.name === 'TokenExpiredError') {
          return res.status(400).json({ success: false, message: "Reset token has expired" });
        } else {
          return res.status(400).json({ success: false, message: "Invalid token" });
        }
      }

      // Check if the decoded token email matches the request email
      if (decodedToken.email !== email) {
        return res.status(400).json({ success: false, message: "Token does not match user email" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      await User.findOneAndUpdate({ email }, { password: hashedPassword });

      res.status(200).json({ success: true, message: "Password reset successfully" });
    });
  } catch (error) {
    next(error);
  }
});





module.exports = router;
