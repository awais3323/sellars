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

  let id = orderItems[0].productId;
  let quan = Number(orderItems[0].quantity);
  let product = await Product.findById(id);

  if (JSON.stringify(product.user) === JSON.stringify(req.user._id)) {
    return next(new Errorhandler(`You cannot order your own product`, 404));
  }
  let item_pricing = product.price - product.price * (product.sales / 1000);
  // console.log(typeof(item_pricing))

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice: Number(item_pricing),
    taxPrice,
    shippingPrice,
    totalPrice: (Number(item_pricing) + taxPrice + shippingPrice) * quan,
    orderStatus,
    paidAt: Date.now(),
    user: req.user._id,
    seller: product.user,
  });
  await updateStock(product._id, order.orderItems[0].quantity);

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

//Get all orders of a specific sellers

exports.getAllSellerOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ seller: req.user._id });
  const orderDates = await Order.find({ seller: req.user._id }).select(
    "createdAt"
  );

  const totord = await Order.find();
  let totalOrders = totord.length;

  let ordDatArr = orderDates.map((od) => od.createdAt);

  let real_ordDatArr = [];
  ordDatArr.forEach((ele) => {
    let ele_s = JSON.stringify(ele).split("-");
    let temp_date = `${ele_s[2].slice(0, 2)} - ${ele_s[1]} - ${ele_s[0]}`;
    real_ordDatArr.push(temp_date.split("-"));
  });

  // console.log(real_ordDatArr)

  res.status(200).json({
    success: true,
    order,
    totalOrders,
    real_ordDatArr,
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
  // console.log(req.query.id)
  // console.log(req.query.status)
  const order = await Order.findById(req.query.id);

  if (!order) {
    return new Errorhandler("Order not found", 404);
  }
  if (req.user.role === "user") {
    if (req.user._id.toString() !== order.user.toString()) {
      return new Errorhandler("not Allowed", 404);
    }
    if (req.query.status.toString() !== "cancelled") {
      return new Errorhandler("You are not allowed for this updation", 404);
    }
  }
  if (req.user.role === "admin") {
    if (req.query.status.toString() !== "cancelled") {
      if (req.user._id.toString() !== order.seller.toString()) {
        return new Errorhandler("not Allowed", 404);
      }
    }
  }
  if (order.orderStatus === "cancelled") {
    return next(new Errorhandler("Cancel Product cannot be Uncancelled", 400));
  }
  if (order.orderStatus === req.query.status) {
    return next(new Errorhandler("product is already on this state", 400));
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.productId, order.quantity);
  });

  order.orderStatus = req.query.status;

  if (req.query.status === "Delivered") {
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
  if (order.orderStatus !== "pending" || order.orderStatus !== "packed") {
    return next(
      new Errorhandler(`The Order is on it's way you cannot cancel it`, 404)
    );
  }
  await order.remove();
  // We will add cloudinary later

  res.status(200).json({
    success: true,
  });
});
