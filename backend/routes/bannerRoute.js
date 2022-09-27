const express = require("express");
const {
  getAllBanners,
  createBanner,
  updateBanner,
  deletebanner,
  getBannerDetails,
} = require("../controllers/bannerController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
router

  .route("/banners")
  .get(isAuthenticatedUser, authorizeRoles("admin_one"), getAllBanners);

router
  .route("/banners/new")
  .post(isAuthenticatedUser, authorizeRoles("admin_one"), createBanner);

router
  .route("/banners/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin_one"), updateBanner)
  .delete(isAuthenticatedUser, authorizeRoles("admin_one"), deletebanner)
  .get(getBannerDetails);
module.exports = router;
