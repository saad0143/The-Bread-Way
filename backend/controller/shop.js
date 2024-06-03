const express = require("express");
const router = express.Router();
const shop = require('../model/Shop'); 
const event = require('../model/event');
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require('fs');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { upload } = require("../multer");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require('../utils/jwtToken');
const { isSeller } = require("../middleware/Auth");
const sendShopToken = require("../utils/shopToken");
const path = require("path");
const Product = require("../model/product");
const generateResetToken = require("../utils/restToken");
const bcrypt = require('bcrypt');



// Create a new shop and send an activation email
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  const { shopName, email, password, phoneNumber, zipCode, address, customizeProducts } = req.body;

  try {
    const sellermail = await shop.findOne({ email });
    if (sellermail) {
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

    // Convert customizeProducts value to boolean
    const customizeProductsBool = customizeProducts.toLowerCase() === 'yes';

    const seller = {
      shopName: shopName,
      email: email,
      password: password,
      avatar: fileUrl,
      address: address,
      phoneNumber: phoneNumber,
      zipCode: zipCode,
      customizeProducts: customizeProductsBool
    };
    //create-New Shop 
    const newShop = await shop.create(seller);

    const activationToken = createActivationToken(newShop);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Account Activation Required",
        message: `
          Dear ${seller.shopName},
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
    next(err);
  }
});
//actovation token
const createActivationToken = (shop) => {
  return jwt.sign(shop.toObject(), process.env.ACTIVATION_SECRET, {
    expiresIn: "5m"
  });
};
// Activate the shop
router.post("/activation", catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const newSeller = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newSeller) {
      return next(new ErrorHandler("Invalid token", 400));
    }
    const Shop = await User.findOne({ email: newSeller.email });
    if (!Shop) {
      return next(new ErrorHandler("User does not exist", 400));
    }
    Shop.active = true;
    await Shop.save();

    sendShopToken(Shop, 200, res);


  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));
//login Shop
router.post("/login-shop", catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide both email and password.", 400));
    }

    const Shop = await shop.findOne({ email }).select("+password");

    if (!Shop) {
      return next(new ErrorHandler("User doesn't exist.", 400));
    }

    const isPasswordValid = await Shop.comparePassword(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid email or password.", 400));
    }

    sendShopToken(Shop, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

// Load shop
router.get("/getSeller", isSeller, catchAsyncErrors(async (req, res, next) => {
  try {

    const seller = await shop.findById(req.seller._id);

    if (!seller) {
      return next(new ErrorHandler("Seller doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

// Logout
router.get("/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("shop_token", null, {
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

// Get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopInfo = await shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop: shopInfo,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update user avatar
router.put(
  "/update-shop-avatar",
  isSeller, upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      let existsUser = await shop.findById(req.seller._id);

      // const existAvatarPath = `uploads/${existsUser.avatar}`
      // fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const updatedShop = await shop.findByIdAndUpdate(
        req.seller._id,
        { avatar: fileUrl },
        { new: true } // to get the updated document
      );

      const updatedProducts = await Product.updateMany(
        { shopId: req.seller._id },
        { $set: { "shop.avatar": fileUrl } }
      );
      const updatedEvents = await event.updateMany(
        { shopId: req.seller._id },
        { $set: { "shop.avatar": fileUrl } }
      );
      
      res.status(200).json({
        success: true,
        shop: updatedShop,
        updatedProducts,
        updatedEvents
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { shopName, description, address, phoneNumber } = req.body;

      // Find and update the shop information
      const updatedShop = await shop.findOneAndUpdate(
        { _id: req.seller._id },
        { shopName, description, address, phoneNumber },
        { new: true } // to get the updated document
      );
      if (!updatedShop) {
        return next(new ErrorHandler("User not found", 400));
      }
      // Update the shop information in all associated products
      const updatedProducts = await Product.updateMany(
        { shopId: req.seller._id },
        {
          $set: {
            "shop.shopName": shopName,
            "shop.address": address,
            "shop.description": description,
            "shop.phoneNumber": phoneNumber,
          },
        }
      );
      // Update the event information in all associated products
      const updatedEvents = await event.updateMany(
        { shopId: req.seller._id },
        {
          $set: {
            "shop.shopName": shopName,
            "shop.address": address,
            "shop.description": description,
            "shop.phoneNumber": phoneNumber,
          },
        }
      );


      res.status(201).json({
        success: true,
        shop: updatedShop,
        updatedProducts,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


// Route for sending reset password email
router.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    const ShopOwner = await shop.findOne({ email });

    if (!ShopOwner) {
      return res.status(404).json({ success: false, message: "User not found with this email" });
    }
    
    const resetToken = generateResetToken(email); // Generate the reset token
    const resetUrl = `http://localhost:3000/shop-reset-password/${resetToken}`; // Assuming a frontend route for resetting password
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
      await shop.findOneAndUpdate({ email }, { password: hashedPassword });

      res.status(200).json({ success: true, message: "Password reset successfully" });
    });
  } catch (error) {
    next(error);
  }
});



module.exports = router;
