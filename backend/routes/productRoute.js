const express = require("express");
const {
  getAllProucts,
  createProduct,
  updateProducts,
  deleteProducts,
  getProductDetails,
  reviewCreateUpdate,
  reviewGetAll,
  reviewdelete,
  getProductCategory,
  getAllProuctsAccCats,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
router.route("/product").get(getAllProucts);
router.route("/producters").get(getAllProuctsAccCats);
router
  .route("/products/new")
  .post(isAuthenticatedUser, authorizeRoles("admin","admin_one"), createProduct);

router
  .route("/products/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin_one"), updateProducts)
  .delete(isAuthenticatedUser, authorizeRoles("admin","admin_one"), deleteProducts);

router.route("/products/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, reviewCreateUpdate);
router
  .route("/review")
  .get(reviewGetAll)
  .delete(isAuthenticatedUser, reviewdelete);
module.exports = router;
