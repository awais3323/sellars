const User = require("../models/userModels");
const Errorhandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const crypto = require("crypto"); // This is a built in module
const cloudinary = require("cloudinary");
const { pathToFileURL } = require("url");


exports.registerUser = catchAsyncErrors( async (req, res, next) => {
let myCloud= [];
let PID;
let PURL;
  if(req.body.avatar.length > 100){

    myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
      folder:"avatars",
      width:750,
      crop:"scale",
    })
  }
  if(req.body.avatar.length > 100){
    PID = myCloud.public_id;
    PURL = myCloud.secure_url;
  }
  else{
    PID  = "HelloGuys"
    PURL  = req.body.avatar;
  }

  console.log(typeof(req.body.avatar))
  console.log(typeof(myCloud.secure_url))

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: PID,
      url: PURL,
    },
  });
  sendToken(user, 201, res);
});

// Login User

exports.loginUser = catchAsyncErrors( async (req, res, next) => {
  const { email, password } = req.body;

  //Checkinf if the user has given password and email both

  if (!email || !password) {
    return next(new Errorhandler("Please Enter Both Email and Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new Errorhandler("Invalid Email or Password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new Errorhandler("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});

// Logout user
exports.logoutUser = catchAsyncErrors( async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "user is logged out",
  });
});

// Forgot Password

exports.ForgotPassword = catchAsyncErrors( async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  // console.log(user)
  if (!user) {
    return next(new Errorhandler("User not Found", 404));
  }
  // Get reset password Token
  const resetToken = user.getresetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = `Hey ${user.name}.\n\n We Hope you are having a good time.\n\nAccording to your request you just forgot the Password of your account not a problem. Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it and send us the feedback or complain on our website. and we will handle the further details. \n\n\ Thanks! Happy Shopping`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Gadget Zone ®`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    console.error(error)
    return next(new Errorhandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors( async (req, res, next) => {
  // creating Token Hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new Errorhandler("Password token is invalid or expired", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new Errorhandler("Password doesn't match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
});

// getUser Details

exports.UserDetails = catchAsyncErrors( async (req, res, next) => {
  const user = await User.findById(req.user.id);
  // console.log(req.user.id)

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Password
exports.updateUserPassword = catchAsyncErrors( async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new Errorhandler("Old Password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new Errorhandler("Password doesn't match", 400));
  }
  user.password = req.body.newPassword;

  await user.save();
  sendToken(user, 200, res);
});

// Update User porfile
exports.updateProfile = catchAsyncErrors( async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get all user (Admin)
exports.getAllUsers = catchAsyncErrors( async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});
exports.getAllUsersDates = catchAsyncErrors( async (req, res, next) => {
  const AllusersDates = await User.find().select("createdAt");
  const Allusers = await User.find();

  // console.log(AllusersDates)

  let ordDatArr = AllusersDates.map((od)=> od.createdAt)
  
  let real_UserAllrDatArr=[];
  ordDatArr.forEach((ele)=>{
    
    let ele_s = JSON.stringify(ele).split("-");
    let temp_date = `${ele_s[2].slice(0, 2)} - ${ele_s[1]} - ${ele_s[0]}`
    real_UserAllrDatArr.push(temp_date.split("-"))
  })
  // console.log(real_ordDatArr)

  res.status(200).json({
    success: true,
    real_UserAllrDatArr,
    Allusers
  });
});
exports.getSellerUsersDates = catchAsyncErrors( async (req, res, next) => {
  const usersDates = await User.find({role:{$ne:"admin_one"}}).select("createdAt");
  const usersSeller = await User.find({role:{$ne:"admin_one"}});

  let ordDatArr = usersDates.map((od)=> od.createdAt)
  
  let real_UserSellerDatArr=[];
  ordDatArr.forEach((ele)=>{
    
    let ele_s = JSON.stringify(ele).split("-");
    let temp_date = `${ele_s[2].slice(0, 2)} - ${ele_s[1]} - ${ele_s[0]}`
    real_UserSellerDatArr.push(temp_date.split("-"))
  })
  // console.log(real_ordDatArr)

  res.status(200).json({
    success: true,
    real_UserSellerDatArr,
    usersSeller
  });
});

// Get Single user (Admin)
exports.getOneUsers = catchAsyncErrors( async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new Errorhandler(`User does not exist ${req.params.id}`, 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});
// Update User Role -- adminone
exports.updateRole = catchAsyncErrors( async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  // We will add cloudinary later
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return next(
      new Errorhandler(`User Does not exist with id ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
  });
});

// Delete User Role -- adminone
exports.deleteRole = catchAsyncErrors( async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new Errorhandler(`User Does not exist with id ${req.params.id}`)
    );
  }
  await user.remove()
  // We will add cloudinary later

  res.status(200).json({
    success: true,
  });
});

exports.addStrike =catchAsyncErrors(async(req,res,next)=>{
  const { subject, Description, userId } = req.body;

  if(req.user.role !== "admin_one"){
    return next(new Errorhandler("You are not allowed for this action", 400));
  }
  
  if (!subject || !Description) {
    return next(new Errorhandler("Please Enter Both Email and Password", 400));
  }
  const user = await User.findById(userId);
  if (!user) {
    return next(new Errorhandler("Invalid user", 401));
  }
  if(user.role === "admin_one"){
    return next(new Errorhandler("Admin_one cannot have strikes", 400));
  }
  const strike ={
    subject,
    Description
  }

  user.strikes.push(strike);
  await user.save({ validateBeforeSave: false });


  res.status(200).json({
    success: true,
  });

})
exports.deleteStrike =catchAsyncErrors(async(req,res,next)=>{
  const { strikeId, userId } = req.body;

  if(req.user.role !== "admin_one"){
    return next(new Errorhandler("You are not allowed for this action", 400));
  }
if (!strikeId || !userId) {
    return next(new Errorhandler("Please Enter Both Email and Password", 400));
  }
  const user = await User.findById(userId);
  if (!user) {
    return next(new Errorhandler("Invalid User", 401));
  }

  if(user.strikes.length ===0 || user.strikes.length ===0){
    return next(new Errorhandler(`${user.name} has no strike on his account`, 400));
  }

  const strikes = user.strikes.filter((s)=>s._id.toString() !== strikeId.toString());

  await User.findByIdAndUpdate(
    userId,
    {
      strikes
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
})