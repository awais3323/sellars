const Product = require("../models/productModel");
const User = require("../models/userModels");
const ApiFeatures = require("../utils/apiFeatures");
const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");

// Create Product --- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  if (req.user.strikes.length >= 5) {
    return next(
      new Errorhandler(
        "This Account have 5 strikes it is allowed to make further products contact Admin",
        404
      )
    );
  }
  let images = [];
  // console.log(req.body.Tags)
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  const Tagzs = [];
  Tagzs.push({
    tag1: req.body.Tags[0],
    tag2: req.body.Tags[1],
    tag3: req.body.Tags[2],
    tag4: req.body.Tags[3],
    tag5: req.body.Tags[4],
  });
  req.body.Tags = Tagzs;
  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// Get all products
exports.getAllProucts = catchAsyncErrors(async (req, res, next) => {
  // return next(new Errorhandler("this is my temp error", 500));

  const resultPerPage = 100;
  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(
    Product.find().sort({ createdAt: 1 }),
    req.query
  )
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

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    // real_prodDatArr,
    filteredProductsCount,
  });
});
exports.getSellerProuctsDates = catchAsyncErrors(async (req, res, next) => {
  const productDate = await Product.find({ user: req.user._id }).select(
    "createdAt"
  );

  let ordDatArr = productDate.map((od) => od.createdAt);

  let real_ordDatArr = [];
  ordDatArr.forEach((ele) => {
    let ele_s = JSON.stringify(ele).split("-");
    let temp_date = `${ele_s[2].slice(0, 2)} - ${ele_s[1]} - ${ele_s[0]}`;
    real_ordDatArr.push(temp_date.split("-"));
  });
  // console.log(real_ordDatArr)

  res.status(200).json({
    success: true,
    real_ordDatArr,
  });
});

exports.ProductTagsPanga = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  products.forEach((product_1) => {
    let v = [];

      v.push(product_1.Tags[0].tag1) 
      v.push(product_1.Tags[0].tag2) 
      v.push(product_1.Tags[0].tag3) 
      v.push(product_1.Tags[0].tag4) 
      v.push(product_1.Tags[0].tag5) 
    console.log(v)
  });

  res.status(200).json({
    Ho_gaya: true,
    products,
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
  if (req.user.strikes.length >= 5) {
    return next(
      new Errorhandler(
        "This Account have 5 strikes it is allowed to edit further products contact Admin",
        404
      )
    );
  }
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  }

  if (req.user.role === "user") {
    return next(
      new Errorhandler("You are not authorized for this action", 401)
    );
  }
  if (req.user.role === "admin") {
    if (req.user._id !== product.user) {
      return next(
        new Errorhandler(
          "You are not authorized for action on this product",
          401
        )
      );
    }
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  const Tagzs = [];
  Tagzs.push({
    tag1: req.body.Tags[0],
    tag2: req.body.Tags[1],
    tag3: req.body.Tags[2],
    tag4: req.body.Tags[3],
    tag5: req.body.Tags[4],
  });
  req.body.Tags = Tagzs;
  // req.body.images = imagesLinks;
  req.body.user = product.user;

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

  if (req.user.role === "user") {
    return next(
      new Errorhandler("You are not authorized for this action", 401)
    );
  }

  if (req.user.role === "admin") {
    if (req.user._id !== product.user) {
      return next(
        new Errorhandler(
          "You are not authorized for action on this product",
          401
        )
      );
    }
  }
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
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
    url: req.user.avatar.url,
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
