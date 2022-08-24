const Order = require("../models/orderModels");
const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Creating a new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderStatus,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice: itemsPrice + taxPrice + shippingPrice,
    orderStatus,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

// Get Single Order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(
      new Errorhandler(`Order not found with this id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get All orders == Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find();
  res.status(200).json({
    success: true,
    order,
  });
});
// Get All orders == User
exports.getAllOrdersUsers = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  let totalAmount = 0;

  order.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    order,
  });
});

// Update Order Status --Admin
exports.UpdateOrdersAdmin = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return new Errorhandler("Order not found",404)
  }

  if (order.orderStatus === "Delivered") {
    return next(new Errorhandler("You have already delivered the order", 400));
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.productId, order.quantity);
  });

  order.orderStatus = req.body.status;
  
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// Delete order

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new Errorhandler(`Order Not Found ${req.params.id}`, 404));
  }
  await order.remove();
  // We will add cloudinary later

  res.status(200).json({
    success: true,
  });
});
