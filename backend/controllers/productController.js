const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Product --- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// Get all products
exports.getAllProucts = catchAsyncErrors(async (req, res, next) => {
  // return next(new Errorhandler("this is my temp error", 500));
  const resultPerPage = 100;
  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
    
  let products = await apiFeature.query;
  // const apiFeatures = new ApiFeatures(Product.find(), req.query)
  //   .searchCat()
  //   .filter();

  // let productert = await apiFeatures.query;

  // let products = producter.concat(productert);
  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  // console.log(products)
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});
exports.getAllProuctsAccCats = catchAsyncErrors(async (req, res, next) => {
  // return next(new Errorhandler("this is my temp error", 500));
  const resultPerPage = 100;
  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .searchCat()
    .filter();

  let producter = await apiFeature.query;
  let filteredProductsCount = producter.length;

  apiFeature.pagination(resultPerPage);

  res.status(200).json({
    success: true,
    producter,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});


// Get Single Product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//Update Products
exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  }
  // Kamal Ki cheez
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    // yahan pe hum product ki id find kr ke usko update kr rahaya hain with this
    new: true, // yahan pe hum schema new kr rahay hain
    runValidators: true, // yahan pe hum ne jo schema main validators lagay they unko true kr rahay hain
    useFindAndModify: false, // yeh humara hud dhoond ke nai karay ga edit
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Products
exports.deleteProducts = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
//Create New review and update a review
exports.reviewCreateUpdate = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    url:req.user.avatar.url,
    rating: Number(rating),
    comment,
  };
  // console.log(req.user.avatar.url)
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// getAll Reviews
exports.reviewGetAll = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return new Errorhandler("product not found", 404);
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete Reviews
exports.reviewdelete = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return new Errorhandler("product not found", 404);
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const rating = avg / reviews.length;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
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
});
